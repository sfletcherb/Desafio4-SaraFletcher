const express = require("express");
const router = express.Router();
const { readProducts } = require("../utils/get.products.js");

router.get("/", async (req, res) => {
  try {
    const data = await readProducts();
    res.render("index", { data });
  } catch (error) {
    console.log("error to load list of products");
    res.status(500).send("error loading products");
  }
});

router.get("/realtimeproducts", async (req, res) => {
  res.render("realtimeproducts");
});

module.exports = router;
