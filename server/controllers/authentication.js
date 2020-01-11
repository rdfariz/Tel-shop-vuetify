const ErrorHandler = require("../utils/errorResponse");
const { register, login, getMe } = require("../models/authentication");

// register
exports.register = (req, res, next) => {
  // get all form data
  var data = { ...req.body };

  // validasi
  if (data.nama == "") {
    return next(new ErrorHandler("Isi field nama!", 400));
  }

  if (data.email == "") {
    return next(new ErrorHandler("Isi field email!", 400));
  }

  if (data.no_hp == "") {
    return next(new ErrorHandler("Isi field no hp!", 400));
  }

  if (data.level == "") {
    return next(new ErrorHandler("Isi field level!", 400));
  }

  if (data.username == "") {
    return next(new ErrorHandler("Isi field username!", 400));
  }

  if (data.password == "") {
    return next(new ErrorHandler("Isi field password!", 400));
  }

  // validasi password and password confirm
  if (data.password !== data.passwordConfirm) {
    return next(new ErrorHandler("konfirmasi password tidak sesuai!", 400));
  }

  // delete password confirm
  delete data.passwordConfirm;

  register(res, next, data);
};

// login
exports.login = (req, res, next) => {
  // get all form data
  var data = { ...req.body };

  // validasi
  if (data.username == "") {
    return next(new ErrorHandler("Isi field username!", 400));
  }

  if (data.password == "") {
    return next(new ErrorHandler("Isi field password!", 400));
  }

  login(res, next, data);
};

// get current logged in user
exports.getMe = (req, res, next) => {
  getMe(res, next, req.user.username);
};
