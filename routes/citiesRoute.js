const express = require('express');
const { getCitiesHandler } = require('../controllers/citiesController');


const router = express.Router();

router.get('/cities', getCitiesHandler);


module.exports = router;