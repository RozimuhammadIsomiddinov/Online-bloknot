const jwt = require("jsonwebtoken");
module.exports = function auth(req, res, next) {
  const token = req.header("x-users-token");
  if (!token)
    return res
      .status(400)
      .send("Cannot be accessed by a token that does not exist!!!");
  try {
    const decoded = jwt.verify(token, "p@r01");
    req.user = decoded;
    next();
  } catch (er) {
    return res.status(401).send("Invalid token");
  }
};
