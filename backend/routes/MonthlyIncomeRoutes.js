const express = require("express");
const router = express.Router();

const monthlyIncomeController = require("../controllers/MonthlyIncomeController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/", authMiddleware, monthlyIncomeController.getAllMonthlyIncomes);
router.get("/:id", authMiddleware, monthlyIncomeController.getMonthlyIncomeById);
router.post("/", authMiddleware, monthlyIncomeController.createMonthlyIncome);
router.put("/:id", authMiddleware, monthlyIncomeController.updateMonthlyIncome);
router.delete("/:id", authMiddleware, monthlyIncomeController.deleteMonthlyIncome);

module.exports = router;