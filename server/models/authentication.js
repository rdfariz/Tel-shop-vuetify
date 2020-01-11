const connectDB = require("../config/db");
const Crypter = require("cryptr");
const crypter = new Crypter("myTotalySecretKey");
const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/errorResponse");
const { sendTokenResponse, responseData } = require("../utils/responseHandler");

const Users = connectDB.extend({
  tableName: "users"
});
const users = new Users();

// register
exports.register = async (res, next, data) => {
  await users.find(
    "all",
    { where: `username = '${data.username}'` },
    async (err, rows, field) => {
      if (err) return next(err);

      if (rows.length) {
        return next(new ErrorHandler("username telah terdaftar!", 400));
      }

      // encrypt password
      var encryptedPassword = crypter.encrypt(data.password);
      data.password = encryptedPassword;

      const pushData = await new Users(data);
      pushData.save((err, result) => {
        if (err) return next(err);

        const token = jwt.sign({ username: pushData.username }, "secretajah", {
          expiresIn: "1d"
        });

        // output response
        sendTokenResponse(res, 201, "Berhasil registrasi!", pushData, token);
      });
    }
  );
};

// login
exports.login = async (res, next, data) => {
  await users.find(
    "all",
    { where: `username = '${data.username}'` },
    async (err, rows, field) => {
      if (err) return next(err);

      // cek username
      if (rows.length === 0) {
        return next(new ErrorHandler("username atau password salah!", 400));
      }

      // cek password
      var decryptedPassword = crypter.decrypt(rows[0].password);

      if (data.password !== decryptedPassword) {
        return next(new ErrorHandler("username atau password salah!", 400));
      }

      // generate token
      const token = jwt.sign({ username: rows[0].username }, "secretajah", {
        expiresIn: "1d"
      });

      // output response
      sendTokenResponse(res, 200, "Berhasil login!", rows[0], token);
    }
  );
};

// get me
exports.getMe = async (res, next, username) => {
  await users.find(
    "first",
    { where: `username = '${username}'` },
    async (err, rows, field) => {
      if (err) return next(new ErrorHandler("Token tidak sesuai!", 400));

      responseData(res, 200, rows);
    }
  );
};
