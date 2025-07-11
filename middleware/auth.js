const jwt = require("jsonwebtoken");
const SECRET = "supersecurekey";

function authMiddleware(req, res, next) {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({message:'unauthorized'});

  jwt.verify(token, SECRET, (err, userData) => {
    if (err) return res.sendStatus(403);
    req.user = userData; // save decoded user to request
    next();
  });
}

module.exports = authMiddleware;
