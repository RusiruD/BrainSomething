const mongoose = require('mongoose');

const Schema = mongoose.Schema; // Create a reference to the Mongoose Schema constructor

// Define a schema for storing reaction records
const reactionGameRecordSchema = new Schema({
    name: {
        type: String, // The 'name' field is of type String
        required: true // The 'name' field is required
    },
    score: {
        type: Number, // The 'score' field is of type Number
        required: true // The 'score' field is required
    }
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' timestamps

// Export the schema as a model named 'ReactionRecord'
module.exports = mongoose.model('ReactionGameRecord', reactionGameRecordSchema, 'ReactionGameRecords'); // The third argument specifies the collection name in the database
