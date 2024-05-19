const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { verifyTokenAndAdmin } = require("./verifyToken");

//Create Product
router.post("/", async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json({
      status: 1,
      message: "Бараа амжилттай нэмэгдлээ",
      data: [savedProduct],
    });
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

// Update Product
router.put("/:id", async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );

    if (updatedProduct == null) {
      res.status(200).json({ success: 0, message: "No Data Found!" });
    } else {
      res.status(200).json({
        success: 1,
        message: "Бараа амжилттай шинчлэгдлээ",
        data: [updatedProduct],
      });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

router.get("/seller/:sellerId", async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const shopsBySeller = await Product.find({ seller: sellerId });

    if (shopsBySeller.length > 0) {
      res.status(200).json({ success: 1, message: "", data: shopsBySeller });
    } else {
      res.status(200).json({
        success: 0,
        message: "No shops found for the specified seller.",
      });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

//Get All Products
router.get("/", async (req, res) => {
  try {
    const itemPerPage = parseInt(req.query.limit || "10"); // Products per page
    const pageNum = parseInt(req.query.page || "0"); // Products page number
    const sortByVal = req.query.sortBy || "_id"; // Products sort by
    const searchText = req.query.searchText || ""; // Products search text
    const priceFilter = req.query.price || ""; // Products price filter
    const sellerId = req.query.sellerId || ""; // Seller ID filter
    const shopId = req.query.shopId || ""; // Shop ID filter

    let sortObject = {};
    let filterObj = {};
    let searchTextObj = {};
    let priceObject = {};
    let sellerIdObj = {};
    let shopIdObj = {};

    let sortByField = sortByVal;

    if (sortByVal === "name") {
      sortByField = "title";
    }

    if (searchText !== "") {
      searchTextObj = {
        $or: [
          { title: { $regex: searchText, $options: "i" } },
          { description: { $regex: searchText, $options: "i" } },
        ],
      };
    }

    if (priceFilter !== "") {
      priceObject = { price: { $lte: priceFilter } };
    }

    if (sellerId !== "") {
      sellerIdObj = { seller: sellerId };
    }
    if (shopId !== "") {
      shopIdObj = { shop: shopId };
    }

    filterObj = {
      $and: [searchTextObj, priceObject, shopIdObj],
    };

    sortObject[sortByField] = 1;

    const totalProducts = await Product.countDocuments(filterObj);
    const productData = await Product.find(filterObj)
      .sort(sortObject)
      .limit(itemPerPage)
      .skip(itemPerPage * pageNum);

    let numOfPages = parseInt(totalProducts / itemPerPage);

    if (productData) {
      res
        .status(200)
        .json({ success: 1, message: "", numOfPages, data: productData });
    } else {
      res.status(200).json({ success: 0, message: "No Data Found!", data: [] });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

//Get All Products
router.get("/all", async (req, res) => {
  try {
    const totalProducts = await Product.countDocuments({});
    const productData = await Product.find({}).sort({ _id: 1 });

    if (productData) {
      res.status(200).json({ success: 1, message: "", data: productData });
    } else {
      res.status(200).json({ success: 0, message: "No Data Found!" });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

//Get Single Product
router.get("/find/:id", async (req, res) => {
  try {
    const productData = await Product.findById(req.params.id);

    if (productData) {
      res.status(200).json({ success: 1, message: "", data: productData });
    } else {
      res.status(200).json({ success: 0, message: "No Data Found!" });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (deletedProduct == null) {
      res.status(200).json({ success: 0, message: "No Data Found!" });
    } else {
      res
        .status(200)
        .json({ success: 1, message: "Бараа амилттай устгагдлаа" });
    }
  } catch (err) {
    res.status(500).json({ status: 0, message: err.message });
  }
});

module.exports = router;
