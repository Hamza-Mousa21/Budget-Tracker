const express = require("express");
const router = express.Router();

const transactionController = require("../controllers/TransactionController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, transactionController.getAllTransactions);
router.post("/", authMiddleware, transactionController.createTransaction);

// 🔥 الجداد
router.put("/:id", authMiddleware, transactionController.updateTransaction);
router.delete("/:id", authMiddleware, transactionController.deleteTransaction);

module.exports = router;