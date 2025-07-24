const express = require('express');
const router = express.Router();
const { addCategory, getAllCategories, deleteCategory } = require('../controllers/categoryController');
const db = require('../db');

router.post('/categories', addCategory);
router.get('/categories', getAllCategories);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
