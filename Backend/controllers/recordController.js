
const ReactionGameRecords = require('../models/reactionRecordModel');
const DinoJumpRecords = require('../models/dinoJumpRecordModel');
const ChimpTestRecords = require('../models/chimpTestRecordModel');
const ColourPuzzleRecords = require('../models/colourPuzzleRecordModel');
const OverallRecords = require('../models/overallScoreRecordModel');
const { get } = require('mongoose');

// Get all reaction records
const getAllRecords = async (req, res) => {
    let records;
    try {
        const screen = req.headers['screen'];
        if(screen=="1"){
            records = await DinoJumpRecords.find({}).sort({ createdAt: -1 });
        }
        else if(screen=="2"){
            records = await ReactionGameRecords.find({}).sort({ createdAt: -1 });
        }
        else if(screen=="3"){
            records = await ColourPuzzleRecords.find({}).sort({ createdAt: -1 });}
        else if(screen=="4"){
            records = await ChimpTestRecords.find({}).sort({ createdAt: -1 });
        }

       
        res.status(200).json(records);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get top 5 scores of the day
const getTopScores = async (req, res) => {
    

    try {
        const screen = req.headers['screen'];
        // Access the screen parameter
        
        const startOfDay = new Date();
        startOfDay.setHours(0, 0, 0, 0);
        let topScores;
        if(screen=="1"){
            topScores = await DinoJumpRecords.find({}).sort({ score: -1 }).limit(5);
        }
        else if(screen=="2"){
            topScores = await ReactionGameRecords.find({}).sort({ score: 1 }).limit(5);
        }
        else if(screen=="3"){
            topScores = await ColourPuzzleRecords.find({}).sort({ score: -1 }).limit(5);
        }
        else if(screen=="4"){
            topScores = await ChimpTestRecords.find({}).sort({ score: -1 }).limit(5);
        }
        res.status(200).json(topScores);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
const getUserScores = async (req, res) => {
    let records;
    try {
        records = await OverallRecords.find({}).sort({ createdAt: -1 });
        res.status(200).json(records);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};





// Save a new score
const saveScore = async (req, res) => {
    const { name, score } = req.body;
    const screen = req.headers['screen'];
    
    try {
        let overallRecord;

        const nameRecordExists = await OverallRecords.findOne({name}); // Fetch all records

        // Check if the specific name exists in the records
        if(!nameRecordExists){
                overallRecord = await OverallRecords.create({ name });
        }

        let record;
        if(screen=="1"){
            record = await DinoJumpRecords.create({ name, score });
            //only updates the overall score if the new score is higher than the current score
            if(score> nameRecordExists.dinoJumpScore){
            const updatedRecord = await OverallRecords.findOneAndUpdate(
                { name },                  // Filter: Find the record by name
                { dinoJumpScore: score },   // Update: Set the new value(s) for the attribute(s)
                { new: true }               // Options: Return the updated document
            );}
        }
        else if(screen=="2"){
            record = await ReactionGameRecords.create({ name, score });
            if(score< nameRecordExists.reactionGameScore){
            const updatedRecord = await OverallRecords.findOneAndUpdate(
                { name },                  
                { reactionGameScore: score }, 
                { new: true }               
            );}
        }
        else if(screen=="3"){
            record = await ColourPuzzleRecords.create({ name, score });
            if(score< nameRecordExists.colourPuzzleScore){
            const updatedRecord = await OverallRecords.findOneAndUpdate(
                { name },                 
                { colourPuzzleScore: score }, 
                { new: true }              
            );}
        }
        else if(screen=="4"){
            record = await ChimpTestRecords.create({ name, score });
            if(score> nameRecordExists.chimpTestScore){
            const updatedRecord = await OverallRecords.findOneAndUpdate(
                { name },                 
                { chimpTestScore: score }, 
                { new: true }               
            );}
        }

        

        res.status(200).json(record);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Get user rank based on score
const getUserRank = async (req, res) => {
    const { score } = req.body;

    try {
        const screen = req.headers['screen'];
        console.log(`Screen header value: ${screen}`);
        let allRecords;
        
        let rank = 1;
        if (screen=="1"){
            allRecords = await DinoJumpRecords.find({}).sort({ score: -1 });
            for (let i = 0; i < allRecords.length; i++) {
                if (allRecords[i].score >= score) {
                    rank++;
                } else {
                    break;
                }
            }
        }
        else if(screen=="2"){
             allRecords = await ReactionGameRecords.find({}).sort({ score: 1 });
             for (let i = 0; i < allRecords.length; i++) {
                if (allRecords[i].score <= score) {
                    rank++;
                } else {
                    break;
                }
            }
        }
        else if (screen=="3"){
            allRecords = await ColourPuzzleRecords.find({}).sort({ score: 1 });
            for (let i = 0; i < allRecords.length; i++) {
                if (allRecords[i].score <= score) {
                    rank++;
                } else {
                    break;
                }
            }}

        else if (screen=="4"){
            allRecords = await ChimpTestRecords.find({}).sort({ score: -1 });
            for (let i = 0; i < allRecords.length; i++) {
                if (allRecords[i].score >= score) {
                    rank++;
                } else {
                    break;
                }
            }
        }
      
        
       
        res.status(200).json({ rank });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = {
    getAllRecords,
    getTopScores,getUserScores,
    saveScore,
   
    getUserRank
};
