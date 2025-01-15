const express = require('express')
const { postAProduct, getAllProducts, getSingleProduct, UpdateProduct, deleteAProduct } = require('./product.controller.js');
const router = express.Router();

router.post("/create-product", postAProduct);

router.get("/", getAllProducts);

router.get("/:id", getSingleProduct);

router.put("/edit/:id", UpdateProduct);

router.delete("/:id", deleteAProduct);


module.exports = router;