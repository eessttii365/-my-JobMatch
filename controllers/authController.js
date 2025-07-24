const jwt = require("jsonwebtoken");
const UserModel = require("../models/user.model");
const bcrypt = require('bcrypt');

//פונקציה לרישום משתמש חדש
const register = async (req, res) => {
  const { rol, name, mobile, email, password, location } = req.body;

  try {
    // בדיקה אם המשתמש כבר קיים
    console.log('UserModel:', UserModel);
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "האימייל כבר קיים במערכת" });
    }

    if (!name || !mobile || !email || !password || !location) {
      return res.status(400).json({ message: "יש למלא את כל השדות הנדרשים" });
    }

    // הצפנת סיסמה
    const hashedPassword = await bcrypt.hash(password, 10);

    if (!req.body.password) {
      console.error("Password is missing!");
      return res.status(400).json({ error: "Password is required" });
    }

    // יצירת משתמש חדש
    await UserModel.create({
      rol,
      name,
      mobile,
      email,
      password: hashedPassword,
      location
    });

    console.log("register successfully");
    res.status(201).json({ message: "המשתמש נרשם בהצלחה" });

  } catch (error) {
    console.error("error in register:", error);
    res.status(500).json({ message: "שגיאה בשרת" });
  }
};



//פונקציה להתחברות
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // חיפוש המשתמש לפי אימייל
    const user = await UserModel.findOne({ where: { email } });
    if (!user) return res.status(400).json({ message: "אימייל או סיסמה שגויים" });

    // השוואת סיסמה
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "אימייל או סיסמה שגויים" });

    // יצירת טוקן JWT
    const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET, { expiresIn: '1h' });


    console.log("login successfully");
    res.json({ token });

  } catch (error) {
    console.log(error)
    console.error("שגיאה ב-login:", error);
    res.status(500).json({ message: "שגיאה בשרת" });
  }
};



// עדכון פרטי משתמש
const updateProfile = async (req, res) => {
  const { name, previousJobs } = req.body;
  console.log(req.user);
  const userId = req.user.id; // מזהה המשתמש מגיע מהטוקן

  try {
    // חיפוש המשתמש
    console.log("userId:", userId);

    const user = await UserModel.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: "משתמש לא נמצא" });
    }
    // עדכון השדות
    user.name = name;
    user.previousJobs = previousJobs;

    // שמירת השינויים
    await user.save();

    console.log("updateProfile successfully");
    res.json({ message: "הפרופיל עודכן בהצלחה", user });

  } catch (error) {
    console.error("error in updateProfile:", error);
    res.status(500).json({ message: "שגיאה בעדכון הפרופיל" });
  }
};


//קבלת פרטי משתמש מועמד

const getUserProfile = async (req, res) => {
  const z = req.user.id;
  console.log("ID from token:", z);

  try {
    const user = await UserModel.findByPk(z, {
      attributes: ['id', 'name', 'mobile', 'email', 'previousJobs'],
    });
    console.log("user from DB:", user);
    if (!user) {
      return res.status(404).json({ message: "משתמש לא נמצא" });
    }

    res.json(user);
  } catch (error) {
    console.error("שגיאה בשרת:", error);
    res.status(500).json({ message: "שגיאה בשרת" });
  }
};


module.exports = { login, register, updateProfile, getUserProfile };

