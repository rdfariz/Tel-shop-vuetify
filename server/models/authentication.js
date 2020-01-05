const connectDB = require("../config/db");
const Crypter = require("cryptr");
const crypter = new Crypter("myTotalySecretKey");
const ErrorHandler = require("../utils/errorResponse");
const { responseData, responseMessage } = require("../utils/responseHandler");

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

      const pushData = await new Users(data);
      pushData.save((err, result) => {
        if (err) return next(err);

        // output response
        responseData(res, 201, pushData);
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

      // output response
      responseMessage(res, 200, "Berhasil login!");
    }
  );
};
