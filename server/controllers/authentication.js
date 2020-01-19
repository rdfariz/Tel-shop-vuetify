const ErrorHandler = require("../utils/errorResponse");
const { validateRegister, validateLogin } = require("../utils/validation");
const { register, login, getMe } = require("../models/authentication");

// register
exports.register = (req, res, next) => {
  // get all form data
  var data = { ...req.body };

  // validation check
  var errors = validateRegister(data);

  if (errors) {
    return next(new ErrorHandler(errors[0], 400));
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

  // validation check
  var errors = validateLogin(data);

  if (errors) {
    return next(new ErrorHandler(errors[0], 400));
  }

  login(res, next, data);
};

// get current logged in user
exports.getMe = (req, res, next) => {
  getMe(res, next, req.user.username);
};
