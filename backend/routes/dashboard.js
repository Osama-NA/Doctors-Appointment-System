const express = require('express');
const router = express.Router();

const getUserData = require('../controllers/dashboard/getUserData');

router.get('/user', getUserData);

module.exports = router;