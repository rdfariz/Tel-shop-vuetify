const connectDB = require("../config/db");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/errorResponse");

const Users = connectDB.extend({
  tableName: "users"
});
const users = new Users();

// protect routes
exports.protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  // memastikan kalau token dimasukkan
  if (!token) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }

  try {
    // verivy token
    const decoded = jwt.verify(token, "secretajah");
    console.log(decoded);

    await users.find(
      "first",
      { where: `username = '${decoded.username}'` },
      async (err, rows, field) => {
        if (err) {
          return next(new ErrorResponse("username salah!", 400));
        }

        req.user = rows;
        next();
      }
    );
  } catch (err) {
    return next(new ErrorResponse("Not authorize to access this route", 401));
  }
};
