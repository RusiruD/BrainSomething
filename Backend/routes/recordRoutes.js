const express = require('express');
const {
    getAllRecords,
    getTopScores,getUserScores,
    saveScore,
    
    getUserRank
} = require('../controllers/recordController');

const router = express.Router();

// GET all reaction records
router.get('/all-records', getAllRecords);

// GET top 5 scores of the day
router.get('/top-scores', getTopScores);

// POST a new score
router.post('/save-score', saveScore);

router.get('/get-user-scores', getUserScores);

// POST to get user rank based on a score
router.post('/rank', getUserRank);

module.exports = router;
