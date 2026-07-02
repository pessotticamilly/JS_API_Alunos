const express = require("express");
const router = express.Router();

const productController = require("../controllers/productController");

router.get("/", productController.getItems);
router.get("/:id", productController.getItemById);
router.post("/", productController.getItemById);
router.put("/:id", productController.getItemById);
router.delete("/:id", productController.getItemById);

module.exports = router;