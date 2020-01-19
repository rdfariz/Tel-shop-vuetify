const validate = require("validate.js");

exports.validateRegister = data => {
  // user schema
  var constraint = {
    nama: {
      presence: {
        allowEmpty: false
      }
    },
    email: {
      presence: {
        allowEmpty: false
      }
    },
    no_hp: {
      presence: {
        allowEmpty: false
      }
    },
    level: {
      presence: {
        allowEmpty: false
      }
    },
    username: {
      presence: {
        allowEmpty: false
      },
      exclusion: {
        within: ["admin"],
        message: "'%{value}' is not allowed"
      }
    },
    password: {
      presence: {
        allowEmpty: false
      },
      length: {
        minimum: 6,
        message: "must be at least 6 characters"
      }
    },
    passwordConfirm: {
      presence: {
        allowEmpty: false
      },
      length: {
        minimum: 6,
        message: "must be at least 6 characters"
      }
    }
  };

  return validate(data, constraint, { format: "flat" });
};

exports.validateLogin = data => {
  // user schema
  var constraint = {
    username: {
      presence: {
        allowEmpty: false
      },
      exclusion: {
        within: ["admin"],
        message: "'%{value}' is not allowed"
      }
    },
    password: {
      presence: {
        allowEmpty: false
      },
      length: {
        minimum: 6,
        message: "must be at least 6 characters"
      }
    }
  };

  return validate(data, constraint, { format: "flat" });
};
