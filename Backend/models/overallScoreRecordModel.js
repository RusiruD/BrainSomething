const mongoose = require('mongoose');

const Schema = mongoose.Schema; // Create a reference to the Mongoose Schema constructor

// Define a schema for storing reaction records
const overallScoreRecordSchema = new Schema({
    name: {
        type: String, // The 'name' field is of type String
        required: true // The 'name' field is required

    },
    dinoJumpScore: {
        type: Number, // The 'score' field is of type Number
        required: false,
        default: null
    },
    reactionGameScore: {
        type: Number,
        required: false,
        default: null

    },
    colourPuzzleScore: {
        type: Number,
        required: false,
        default:null
    },
    chimpTestScore: {
        type: Number,
        required: false,
        default:null
    },
   
}, { timestamps: true }); // Automatically adds 'createdAt' and 'updatedAt' timestamps

// Export the schema as a model named 'NameRecord'
module.exports = mongoose.model('OverallScoreRecord', overallScoreRecordSchema, 'OverallScoreRecords'); // The third argument specifies the collection name in the database
