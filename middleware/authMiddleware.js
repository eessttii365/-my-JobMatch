const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "גישה נדחתה. טוקן חסר או לא תקין" });
  }

  const token = authHeader.split(" ")[1]; // מפריד את "Bearer" מהטוקן עצמו

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // נשמור את כל המידע מה-token (כמו userId)
    console.log(decoded)
    next();
  } catch (error) {
    res.status(401).json({ message: "טוקן לא תקף" });
  }
};

module.exports = authMiddleware;
