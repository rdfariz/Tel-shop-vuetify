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

exports.validateProduct = data => {
  // schema
  var constraint = {
    id_pelapak: {
      presence: {
        allowEmpty: false
      },
      numericality: {
        onlyInteger: true
      }
    },
    nama_produk: {
      presence: {
        allowEmpty: false
      }
    },
    detail: {
      presence: {
        allowEmpty: false
      }
    },
    harga: {
      presence: {
        allowEmpty: false
      },
      numericality: {
        onlyInteger: true,
        noStrings: true
      }
    },
    jumlah_stok: {
      presence: {
        allowEmpty: false
      },
      numericality: {
        onlyInteger: true,
        noStrings: true
      }
    },
    kondisi: {
      presence: {
        allowEmpty: false
      }
    },
    kategori: {
      presence: {
        allowEmpty: false
      }
    },
    lokasi: {
      presence: {
        allowEmpty: false
      }
    }
  };

  return validate(data, constraint, { format: "flat" });
};