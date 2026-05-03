const db = require("../models");

exports.getAllCategories = async (req, res) => {
  try {
    const categories = await db.Category.findAll({
      include: [{ model: db.Transaction, as: "transactions" }],
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const category = await db.Category.findByPk(req.params.id, {
      include: [{ model: db.Transaction, as: "transactions" }],
    });

    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await db.Category.create({
      name: req.body.name,
      userId: req.user.id,
    });

    res.status(201).json({
      message: "Category created successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};