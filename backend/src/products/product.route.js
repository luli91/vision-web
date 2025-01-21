const express = require('express')
const { postAProduct, getAllProducts, getSingleProduct, UpdateProduct, deleteAProduct } = require('./product.controller.js');
const verifyAdminToken = require('../middlewares/verifyAdminToken.js')

const router = express.Router();

router.post("/create-product", verifyAdminToken, postAProduct);

router.get("/", getAllProducts);

router.get("/:id", getSingleProduct);

router.put("/edit/:id", verifyAdminToken, UpdateProduct);

router.delete("/:id", verifyAdminToken, deleteAProduct);


module.exports = router;