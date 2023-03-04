const Product = require("../model/product_model");
//cloudinary upload
const cloudinary = require("cloudinary").v2;
// Configuration
cloudinary.config({
  cloud_name: "ddtruvpek",
  api_key: "667436246978747",
  api_secret: "kfhh2zP_Cy58-qg3b-iBx1QdlF8",
});

//create Product
const createProduct = (req, res, next) => {
  try {
    const file = req.files.photo;
    cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
      console.log(result.url);
      console.log(error);
      const product = new Product({
        product_id: Date.now(),
        title: req.body.title,
        image: result.url,
        category: req.body.category,
        subCategory: req.body.subCategory,
        qty: req.body.qty,
        price: req.body.price,
      });
      console.log(product);
      product
        .save()
        .then(() => {
          res.status(201).send(product);
          next();
        })
        .catch((error) => {
          res.status(400).send(error);
          next();
        });
    });
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};
//get All Products
const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products) {
      return res.status(200).json({
        status: "success",
        data: products,
      });
    } else {
      return res.status(200).json({
        status: "failed",
        data: products,
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};
//get Single Product :id
const getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findById({ _id: id });
    if (product) {
      return res.status(200).json({
        status: "success",
        data: product,
      });
    } else {
      return res.status(200).json({
        status: "failed",
        data: product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

//delete All Products
const productAllDelete = async (req, res, next) => {
  try {
    // const id=req.params.id;

    const product_delete = await Product.deleteMany();
    const product = await Product.find();
    if (product_delete) {
      console.log(product_delete);
      return res.status(200).json({
        status: "success",
        message: "delete all successfully",
        data: product,
      });
    } else {
      return res.status(200).json({
        status: "failed",
        data: product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};
//delete single Product:id
const productDelete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await Product.findOne({ _id: id });
    const product_delete = await Product.deleteOne({ _id: id });
    if (product) {
      console.log(product_delete);
      return res.status(200).json({
        status: "success",
        message: "delete successfully",
        data: product,
      });
    } else {
      return res.status(200).json({
        status: "failed",
        data: product,
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};
//update  Product
const updateProduct = async (req, res, next) => {
  try {
    const filepath = req.files;
    url = "";
    if (filepath == null) {
      console.log("No Image File Found");
      const id = req.params.id;
      const product_details = {
        // image: url,
        title: req.body.title,
        updateTime: Date.now(),
      };
      const last_product = await Product.findOneAndUpdate(
        { _id: id },
        product_details
      );
      const update_product = await Product.findOne({ _id: id });
      if (last_product) {
        console.log(last_product);
        return res.status(200).json({
          status: "success",
          last_data: last_product,
          update_data: update_product,
        });
      } else {
        return res.status(400).json({
          status: "failed",
          data: update_product,
        });
      }
    } else {
      const file=filepath.photo
      await cloudinary.uploader.upload(file.tempFilePath, (error, result) => {
        console.log(result.url);
        url = result.url;
      });
      const id = req.params.id;
      const product_details = {
        image: url,
        title: req.body.title,
        updateTime: Date.now(),
      };
      const last_product = await Product.findOneAndUpdate(
        { _id: id },
        product_details
      );
      const update_product = await Product.findOne({ _id: id });
      if (last_product) {
        console.log(last_product);
        return res.status(200).json({
          status: "success",
          last_data: last_product,
          update_data: update_product,
        });
      } else {
        return res.status(400).json({
          status: "failed",
          data: update_product,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({
      message: "something went wrong",
      error: error.message,
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  productAllDelete,
  productDelete,
  updateProduct,
};
