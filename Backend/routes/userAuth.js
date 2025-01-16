const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  // Check if token is null
  if (token == null) {
    return res.status(401).json({ message: "Authentication token required" });
  }

  // Verify the token
  jwt.verify(token, "booksonline1234", (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token expired or invalid, please sign in again" });
    }

    // Attach user information to request
    req.user = user;
    next();
  });
};

// Corrected export
module.exports = { authenticateToken };
