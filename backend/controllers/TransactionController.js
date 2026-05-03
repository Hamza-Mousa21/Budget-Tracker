const db = require("../models");

exports.getAllTransactions = async (req, res) => {
  try {
    const transactions = await db.Transaction.findAll({
      include: [
        { model: db.User, as: "user", attributes: { exclude: ["password"] } },
        { model: db.Category, as: "category" },
      ],
    });

    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const transaction = await db.Transaction.findByPk(req.params.id, {
      include: [
        { model: db.User, as: "user", attributes: { exclude: ["password"] } },
        { model: db.Category, as: "category" },
      ],
    });

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    res.json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createTransaction = async (req, res) => {
  try {
    const transaction = await db.Transaction.create({
      amount: req.body.amount,
      description: req.body.description,
      transactionDate: req.body.transactionDate,
      categoryId: req.body.categoryId,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Transaction created successfully",
      transaction,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};