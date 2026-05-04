const db = require("../models");
const { Op } = require("sequelize");

// ✅ GET ALL + FILTER BY MONTH/YEAR
exports.getAllTransactions = async (req, res) => {
  try {
    const { month, year } = req.query;

    let where = {
      userId: req.user.id
    };

    if (month && year) {
      where.transactionDate = {
        [Op.between]: [
          new Date(year, month - 1, 1),
          new Date(year, month, 0, 23, 59, 59)
        ]
      };
    }

    const transactions = await db.Transaction.findAll({
      where,
      include: [
        { model: db.Category, as: "category" }
      ],
      order: [["transactionDate", "DESC"]]
    });

    res.json(transactions);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ CREATE
exports.createTransaction = async (req, res) => {
  try {
    const transaction = await db.Transaction.create({
      amount: req.body.amount,
      description: req.body.description,
      transactionDate: req.body.transactionDate,
      categoryId: req.body.categoryId,
      userId: req.user.id
    });

    res.status(201).json(transaction);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ UPDATE (Edit)
exports.updateTransaction = async (req, res) => {
  try {
    const transaction = await db.Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Not found" });
    }

    await transaction.update({
      amount: req.body.amount,
      description: req.body.description,
      transactionDate: req.body.transactionDate,
      categoryId: req.body.categoryId,
    });

    res.json(transaction);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ DELETE
exports.deleteTransaction = async (req, res) => {
  try {
    const transaction = await db.Transaction.findByPk(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Not found" });
    }

    await transaction.destroy();

    res.json({ message: "Deleted successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};