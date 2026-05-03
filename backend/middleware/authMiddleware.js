const jwt = require("jsonwebtoken");

const SECRET = "mySecretKey";

function authMiddleware(req, res, next) {
   console.log("AUTH MIDDLEWARE HIT");
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Invalid token format" });
  }

  try {
    const decodedUser = jwt.verify(token, SECRET);
    req.user = decodedUser;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
}

module.exports = authMiddleware;