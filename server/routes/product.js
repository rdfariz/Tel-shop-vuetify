const {
    getProducts,
    getProduct,
    getFilteredProducts,
    createProduct,
    updateProduct,
    list
  } = require("../controllers/product");
  const { protect } = require("../middleware/auth");
  const express = require("express");
  const router = express.Router();
  
  router
    .route("/")
    .get(getProducts)
    .post(protect, createProduct);
  router.route("/filter").get(getFilteredProducts);
  router.route("/list").get(list);
  router
    .route("/:id")
    .get(getProduct)
    .put(protect, updateProduct);
  
  module.exports = router;
  