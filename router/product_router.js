const router = require('express').Router();
const {createProduct,getAllProducts,getProduct,updateProduct,productAllDelete,productDelete}=require('../controllers/product_controller');

router
    .post("/createProduct",createProduct)
    .get("/getAllProducts",getAllProducts)
    .get("/getProduct/:id",getProduct)
    .put("/product/:id",updateProduct)
    .delete("/deleteProduct/:id",productDelete)
    .delete("/deleteAllProducts",productAllDelete)

module.exports=router;    