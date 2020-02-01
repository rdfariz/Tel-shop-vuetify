const ErrorResponse = require("../utils/errorResponse");
const connectDB = require("../config/db");
const { responseData } = require("../utils/responseHandler");

// produk
const Product = connectDB.extend({
  tableName: "product"
});
const product = new Product();

// user
const User = connectDB.extend({
  tableName: "users"
});
const user = new User();

// get products
exports.getProducts = async (res, next) => {
  await product.find("all", (err, rows, field) => {
    if (err) return next(err);

    // output response
    responseData(res, 200, rows);
  });
};

// get product
exports.getProduct = async (res, next, id) => {
  var condition = `id_produk = ${id}`;
  await product.find("first", { where: condition }, (err, rows, field) => {
    if (err) return next(err);

    // output response
    responseData(res, 200, rows);
  });
};

// get filtered products (both)
exports.getFilteredProducts = async (res, next, category, location) => {
  var condition;
  // filter condition
  if (category == undefined) {
    condition = `(lokasi = '${location}')`;
  } else if (location == undefined) {
    condition = `(kategori = '${category}')`;
  } else {
    condition = `(kategori = '${category}' AND lokasi = '${location}')`;
  }

  await product.find("all", { where: condition }, (err, rows, field) => {
    if (err) return next(err);

    // output response
    responseData(res, 200, rows);
  });
};

// create new product
exports.createProduct = async (res, next, data) => {
  var condition = `id_user = ${data.id_pelapak}`;
  await user.find("all", { where: condition }, async (err, rows, field) => {
    if (err) return next(err);

    /// if id has not found
    if (!rows.length) {
      return next(new ErrorResponse("ID Pelapak tidak ditemukan", 404));
    }

    const product = await new Product(data);
    product.save((err, result) => {
      if (err) return next(err);

      // output response
      responseData(res, 201, product);
    });
  });
};

// update product
exports.updateProduct = async (res, next, data, id_produk) => {
  var condition = `id_produk = ${id_produk}`;
  await product.find(
    "first",
    { where: condition },
    async (err, rows, field) => {
      if (err) return next(err);

      // update code
      const updateData = await new Product(data);
      updateData.set("id_produk", id_produk);

      updateData.save((err, result) => {
        if (err) return next(err);

        // output response
        responseData(res, 200, updateData);
      });
    }
  );
};