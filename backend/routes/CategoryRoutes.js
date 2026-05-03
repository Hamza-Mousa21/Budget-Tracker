const express = require("express");
const router = express.Router();

const categoryController = require("../controllers/CategoryController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, categoryController.getAllCategories);
router.get("/:id", authMiddleware, categoryController.getCategoryById);
router.post("/", authMiddleware, categoryController.createCategory);

module.exports = router;