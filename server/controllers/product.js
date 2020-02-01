const slugify = require("slugify");
const ErrorResponse = require("../utils/errorResponse");
const {
  getProducts,
  getProduct,
  getFilteredProducts,
  createProduct,
  updateProduct
} = require("../models/product");
const { validateProduct } = require("../utils/validation");

// @desc    Get all product
// @route   GET /api/products
// @access  Public
exports.getProducts = (req, res, next) => {
  getProducts(res, next);
};

// @desc    Get single product
// @route   GET /api/products/:id
// @access  Public
exports.getProduct = (req, res, next) => {
  getProduct(res, next, req.params.id);
};

// @desc    Get all product with filters (using query)
// @route   GET /api/products/filter
// @access  Public
exports.getFilteredProducts = (req, res, next) => {
  getFilteredProducts(res, next, req.query.kategori, req.query.lokasi);
};

// @desc    Create a new product
// @route   POST /api/products
// @access  Private
exports.createProduct = (req, res, next) => {
  var data = { ...req.body };

  // validate input
  var errors = validateProduct(data);
  if (errors) {
    return next(new ErrorResponse(errors[0], 400));
  }

  // generate slug
  data.slug = slugify(data.nama_produk, { lower: true });

  createProduct(res, next, data);
};

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private
exports.updateProduct = (req, res, next) => {
  var data = { ...req.body };

  // validate input
  // var errors = validateProduct(data);
  // if (errors) {
  //   return next(new ErrorResponse(errors[0], 400));
  // }

  data.slug = slugify(data.nama_produk, { lower: true });
  updateProduct(res, next, data, req.params.id);
};

// list kategori dan lokasi
exports.list = (req, res) => {
  var list = {
    kategori: [
      "buku",
      "dapur",
      "elektronik",
      "fashion",
      "gaming",
      "smartphone",
      "olahraga",
      "otomotif",
      "Rumah tangga"
    ],
    lokasi: [
      "FIT",
      "FIK",
      "FEB",
      "FKB",
      "FTE",
      "FRI",
      "FIF",
      "DWP",
      "MSU",
      "Danau Galau"
    ]
  };

  res.status(200).json(list);
};