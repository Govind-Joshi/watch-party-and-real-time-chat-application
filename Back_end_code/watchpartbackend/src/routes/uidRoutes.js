// /routes/uidRoutes.js
const express = require('express');

const router = express.Router();
const { saveUID,redirectSassion } = require('../controlers/uidController');


// router.post('/ypsassionid', saveUID);
router.post('/sassiondata',saveUID)


router.get('/ytr',redirectSassion)
// router.get('/hot',giveHotStarUrl)
module.exports = router;
