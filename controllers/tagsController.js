const Tag = require('../models/tag.model');

// Add tag controller
const addTag = async (req, res) => {
    try {
        const { tagName, verified } = req.body;

        // Ensure tagName is a string
        if (typeof tagName !== 'string' || !tagName.trim()) {
            return res.status(400).json({ message: "Invalid tag name. It must be a non-empty string." });
        }

        // Create the tag without manual verified field modification
        const tag = await Tag.create({ tagName });

        res.status(200).json(tag);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Add multiple tags controller
const addTags = async (req, res) => {
    try {
        const tags = req.body;

        // Check if the request body is an array
        if (!Array.isArray(tags)) {
            return res.status(400).json({ message: "Request body must be an array of tags." });
        }

        // Iterate over each tag object in the array
        const createdTags = [];
        for (const tagData of tags) {
            const { tagName } = tagData;

            // Ensure tagName is a valid string
            if (typeof tagName !== 'string' || !tagName.trim()) {
                return res.status(400).json({ message: `Invalid tag name for one of the entries. All tag names must be non-empty strings.` });
            }

            // Create the tag, ignoring any 'verified' field that might be in the request
            const tag = await Tag.create({ tagName });
            createdTags.push(tag); // Collect created tags
        }

        // Respond with the created tags
        res.status(200).json(createdTags);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Show all tags controller
const showTags = async (req, res) => {
    try {
        // Find all tags from the database
        const tags = await Tag.find();

        // Check if there are any tags in the collection
        if (!tags || tags.length === 0) {
            return res.status(404).json({ message: 'No tags found' });
        }

        // Return the tags found
        res.status(200).json(tags);
    } catch (error) {
        // Log and return any server errors
        console.error('Error fetching tags:', error);
        res.status(500).json({ message: error.message });
    }
};

module.exports = { addTag, addTags, showTags };


