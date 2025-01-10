const TechnologyTag = require('../models/techTag.model');

const addTag = async (req, res) => {
    try {
        const { tagName } = req.body;

        if (typeof tagName !== 'string' || !tagName.trim()) {
            return res.status(400).json({ message: "Invalid technology tag name. It must be a non-empty string." });
        }

        // Check for existing tag with the same name, case-insensitive
        const existingTag = await TechnologyTag.findOne({ tagName: { $regex: new RegExp('^' + tagName + '$', 'i') } });
        if (existingTag) {
            return res.status(409).json({ message: "A technlogy tag with this name already exists." });
        }

        // Create the tag if it does not exist
        const tag = await TechnologyTag.create({ tagName });
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
            const existingTag = await TechnologyTag.findOne({ tagName: { $regex: new RegExp('^' + tagName + '$', 'i') } });
            if (existingTag) {
                errors.push(`A tag with the name '${tagName}' already exists.`);
                continue;
            }

            // Create the tag if it does not exist
            const tag = await TechnologyTag.create({ tagName });
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
        const tags = await TechnologyTag.find();

        // Check if there are any tags in the collection
        if (!tags || tags.length === 0) {
            return res.status(404).json({ message: 'No technology tags found' });
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


