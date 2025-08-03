const jwt = require("jsonwebtoken");
const JWT_SECRET ="mysecretkey123";

function authenticateToken(req, res, next) {
   const token = req.cookies.token;

  if (!token) return res.status(401).json({ message: "Token missing" });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalid" });

    req.user = user; // { userId, username }
    next();
  });
}

module.exports = authenticateToken;
