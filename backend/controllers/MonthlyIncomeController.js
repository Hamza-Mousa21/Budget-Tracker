const db = require("../models");

exports.getAllMonthlyIncomes = async (req, res) => {
  try {
    const incomes = await db.MonthlyIncome.findAll({
      include: [
        { model: db.User, as: "user", attributes: { exclude: ["password"] } },
      ],
    });

    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMonthlyIncomeById = async (req, res) => {
  try {
    const income = await db.MonthlyIncome.findByPk(req.params.id, {
      include: [
        { model: db.User, as: "user", attributes: { exclude: ["password"] } },
      ],
    });

    if (!income) {
      return res.status(404).json({ message: "Monthly income not found" });
    }

    res.json(income);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createMonthlyIncome = async (req, res) => {
  try {
    const income = await db.MonthlyIncome.create({
      amount: req.body.amount,
      month: req.body.month,
      year: req.body.year,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Monthly income created successfully",
      income,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};