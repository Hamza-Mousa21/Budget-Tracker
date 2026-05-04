const db = require("../models");

exports.getAllMonthlyIncomes = async (req, res) => {
  try {
    const { month, year } = req.query;

    const where = {
      userId: req.user.id,
    };

    if (month && year) {
      where.month = parseInt(month);
      where.year = parseInt(year);
    }

    const incomes = await db.MonthlyIncome.findAll({
      where,
      include: [
        { model: db.User, as: "user", attributes: { exclude: ["password"] } },
      ],
      order: [["year", "DESC"], ["month", "DESC"]],
    });

    res.json(incomes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getMonthlyIncomeById = async (req, res) => {
  try {
    const income = await db.MonthlyIncome.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
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
    const { amount, month, year } = req.body;

    const existingIncome = await db.MonthlyIncome.findOne({
      where: {
        month,
        year,
        userId: req.user.id,
      },
    });

    if (existingIncome) {
      await existingIncome.update({
        amount,
      });

      return res.json({
        message: "Monthly income updated successfully",
        income: existingIncome,
      });
    }

    const income = await db.MonthlyIncome.create({
      amount,
      month,
      year,
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

exports.updateMonthlyIncome = async (req, res) => {
  try {
    const income = await db.MonthlyIncome.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!income) {
      return res.status(404).json({ message: "Monthly income not found" });
    }

    await income.update({
      amount: req.body.amount,
      month: req.body.month,
      year: req.body.year,
    });

    res.json({
      message: "Monthly income updated successfully",
      income,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteMonthlyIncome = async (req, res) => {
  try {
    const income = await db.MonthlyIncome.findOne({
      where: {
        id: req.params.id,
        userId: req.user.id,
      },
    });

    if (!income) {
      return res.status(404).json({ message: "Monthly income not found" });
    }

    await income.destroy();

    res.json({ message: "Monthly income deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};