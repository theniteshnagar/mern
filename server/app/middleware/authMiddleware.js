const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/constants.utils");

const authMiddleware = (req, res, next) => {
  const headers = req.headers;
  if (!headers.authorization) {
    res.status(419).send({
      message: "No Authorization token!!!",
    });
  } else {
    const arr = headers.authorization.split(" ");
    try {
      const decoded = jwt.verify(arr[1], JWT_SECRET);
      next();
    } catch (error) {
      res.status(419).send({
        message: "Token is expired or invalid",
      });
    }
  }
};

module.exports = {
  authMiddleware,
};
