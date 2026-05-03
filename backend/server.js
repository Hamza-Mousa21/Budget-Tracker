const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());

const userRoutes = require("./routes/UserRoutes");
const categoryRoutes = require("./routes/CategoryRoutes");
const transactionRoutes = require("./routes/TransactionRoutes");
const monthlyIncomeRoutes = require("./routes/MonthlyIncomeRoutes");

app.use("/users", userRoutes);
app.use("/categories", categoryRoutes);
app.use("/transactions", transactionRoutes);
app.use("/monthly-incomes", monthlyIncomeRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});