const classOfExRnaTag = require('../models/classOfExRnaTag.model');
const Marker = require('../models/marker.model'); // Ensure correct path
const mongoose = require('mongoose');

const addTag = async (req, res) => {
    try {
        const { tagName } = req.body;

        if (typeof tagName !== 'string' || !tagName.trim()) {
            return res.status(400).json({ message: "Invalid class of exRNA tag name. It must be a non-empty string." });
        }

        // Check for existing tag with the same name, case-insensitive
        const existingTag = await classOfExRnaTag.findOne({ tagName: { $regex: new RegExp('^' + tagName + '$', 'i') } });
        if (existingTag) {
            return res.status(409).json({ message: "An class of exRNA tag with this name already exists." });
        }

        // Create the tag if it does not exist
        const tag = await classOfExRnaTag.create({ tagName });
        res.status(201).json(tag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addTags = async (req, res) => {
    try {
        const tags = req.body;

        // Check if the request body is an array
        if (!Array.isArray(tags)) {
            return res.status(400).json({ message: "Request body must be an array of tags." });
        }

        const createdTags = [];
        const errors = [];

        for (const tagData of tags) {
            const { tagName } = tagData;

            // Ensure tagName is a valid string
            if (typeof tagName !== 'string' || !tagName.trim()) {
                errors.push(`Invalid tag name: '${tagName}'. It must be a non-empty string.`);
                continue;
            }

            // Check for existing tag with the same name, case-insensitive
            const existingTag = await classOfExRnaTag.findOne({ tagName: { $regex: new RegExp('^' + tagName + '$', 'i') } });
            if (existingTag) {
                errors.push(`A tag with the name '${tagName}' already exists.`);
                continue;
            }

            // Create the tag if it does not exist
            const tag = await classOfExRnaTag.create({ tagName });
            createdTags.push(tag);
        }

        // If there are errors, include the successfully created tags and the errors
        if (errors.length > 0) {
            return res.status(400).json({ createdTags, errors });
        }

        // Respond with the created tags
        res.status(201).json(createdTags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



// Show all tags controller
const showTags = async (req, res) => {
    try {
        // Find all tags from the database
        const tags = await classOfExRnaTag.find();

        // Check if there are any tags in the collection
        if (!tags || tags.length === 0) {
            return res.status(404).json({ message: 'No class of exRNA tags found' });
        }

        // Return the tags found
        res.status(200).json(tags);
    } catch (error) {
        // Log and return any server errors
        console.error('Error fetching tags:', error);
        res.status(500).json({ message: error.message });
    }
};

// Delete an drivenProcessTag tag
const deleteTag = async (req, res) => {
    try {
        const { id } = req.params;

        // Validate ObjectId format
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid tag ID format." });
        }
        const objectId = new mongoose.Types.ObjectId(id);

        // Find the tag before deletion
        const tag = await classOfExRnaTag.findById(objectId);
        if (!tag) {
            return res.status(404).json({ message: "class of exRNA tag not found." });
        }

        // Prevent deletion of the "NULL" tag
        if (tag.tagName.toLowerCase() === "null") {
            return res.status(403).json({ message: "The 'NULL' tag cannot be deleted." });
        }

        // Find the "NULL" tag (ensure it exists)
        const nullTag = await classOfExRnaTag.findOne({ tagName: "NULL" });
        if (!nullTag) {
            return res.status(500).json({ message: "Critical error: 'NULL' tag is missing in the database." });
        }

        // Delete the tag
        await classOfExRnaTag.findByIdAndDelete(objectId);

        // Find all markers that have this tag in the drivenProcessTag array
        const markers = await Marker.find({ drivenProcessTag: objectId });

        if (!markers || markers.length === 0) {
            return res.status(200).json({
                message: "Class of exRNA tag deleted successfully. No markers needed updates.",
                deletedTag: tag,
                updatedMarkers: []
            });
        }

        // Update markers: Remove the deleted tag and assign "NULL" tag if empty
        const updatedMarkers = await Promise.all(
            markers.map(async (marker) => {
                // Remove the deleted tag from drivenProcessTag
                marker.drivenProcessTag = marker.drivenProcessTag.filter(tagId => tagId.toString() !== id);

                // If drivenProcessTag is empty, assign the "NULL" tag
                if (marker.classOfExRnaTag.length === 0) {
                    marker.classOfExRnaTag = [nullTag._id];
                }

                await marker.save();
                return marker;
            })
        );

        res.status(200).json({
            message: "Class of exRNA tag deleted successfully and markers updated.",
            deletedTag: tag,
            updatedMarkers
        });

    } catch (error) {
        console.error("Error deleting class of exRNA tag:", error);
        res.status(500).json({ message: "An error occurred while deleting the class of exRNA tag." });
    }
};

module.exports = { addTag, addTags, showTags, deleteTag };


