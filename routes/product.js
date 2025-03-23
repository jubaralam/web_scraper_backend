const express = require("express");
const productRouter = express.Router();
const mongoose = require("mongoose");
const Product = require("../model/product");

productRouter.post("/add", async (req, res) => {
  const { title, price, rating } = req.body;
  console.log(title, price, rating);
  try {
    const addProduct = await Product.insertMany(req.body);
    // await addProduct.save();
    res
      .status(201)
      .send({ message: "products have been added", data: addProduct });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

productRouter.get("/", async (req, res) => {
  try {
    const data = await Product.find();
    if (!data) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ data: data });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = productRouter;
