const express = require("express");
const { login, register, updateProfile, getUserProfile } = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
const db = require('../db'); // חיבור למסד הנתונים

const router = express.Router();

// מסלול התחברות
router.post("/login", login);

// נתיב לרישום משתמש חדש
router.post("/register", register);

// עדכון פרופיל - נדרש אימות JWT
router.put("/updateProfile", authMiddleware, updateProfile);

//קבלת משתמש מועמד
router.get('/user/:id', authMiddleware, getUserProfile);


module.exports = router;




