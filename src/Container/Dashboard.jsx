import Header from "../Component/header";
import SidebarBody from "../Component/SidbarBody";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:5000";

const Dashboard = () => {
  const navigate = useNavigate();

  const today = new Date();

  const [isSmall, setIsSmall] = useState(window.innerWidth < 785);
  const [expenses, setExpenses] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);

  const [filterType, setFilterType] = useState("month");
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());
  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0]
  );

  useEffect(() => {
    loadDashboardData();
  }, [filterType, selectedMonth, selectedYear, selectedDate]);

  useEffect(() => {
    const handleSmallScreen = () => {
      setIsSmall(window.innerWidth < 785);
    };

    window.addEventListener("resize", handleSmallScreen);
    return () => window.removeEventListener("resize", handleSmallScreen);
  }, []);

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const getRequestMonthAndYear = () => {
    if (filterType === "date") {
      const d = new Date(selectedDate);
      return {
        month: d.getMonth() + 1,
        year: d.getFullYear(),
      };
    }

    return {
      month: selectedMonth,
      year: selectedYear,
    };
  };

  const normalizeTransaction = (transaction) => {
    return {
      id: transaction.id,
      amount: Number(transaction.amount || 0),
      category: transaction.category?.name || "Other",
      date: transaction.transactionDate
        ? transaction.transactionDate.split("T")[0]
        : "",
      note: transaction.description || "",
      raw: transaction,
    };
  };

  const loadDashboardData = async () => {
    try {
      const token = getToken();

      if (!token) {
        navigate("/login");
        return;
      }

      const { month, year } = getRequestMonthAndYear();

      const transactionsResponse = await fetch(
        `${API_URL}/transactions?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!transactionsResponse.ok) {
        throw new Error("Failed to load transactions");
      }

      let transactions = await transactionsResponse.json();
      let normalizedExpenses = transactions.map(normalizeTransaction);

      if (filterType === "date") {
        normalizedExpenses = normalizedExpenses.filter(
          (expense) => expense.date === selectedDate
        );
      }

      setExpenses(normalizedExpenses);

      const incomeResponse = await fetch(
        `${API_URL}/monthly-incomes?month=${month}&year=${year}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (incomeResponse.ok) {
        const incomes = await incomeResponse.json();
        setMonthlyIncome(incomes.length > 0 ? Number(incomes[0].amount) : 0);
      } else {
        setMonthlyIncome(0);
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
      setExpenses([]);
      setMonthlyIncome(0);
    }
  };

  const handleDeleteExpense = async (id) => {
    if (!window.confirm("Are you sure you want to delete this expense?")) {
      return;
    }

    try {
      const token = getToken();

      const response = await fetch(`${API_URL}/transactions/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete expense");
      }

      loadDashboardData();
    } catch (error) {
      console.error("Error deleting expense:", error);
      alert("Error deleting expense");
    }
  };

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount || 0),
    0
  );

  const remainingBalance = monthlyIncome - totalExpenses;

  const expensesByCategory = () => {
    const categories = {};

    expenses.forEach((expense) => {
      if (!categories[expense.category]) {
        categories[expense.category] = 0;
      }

      categories[expense.category] += Number(expense.amount || 0);
    });

    return categories;
  };

  const recentExpenses = [...expenses]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  const categoriesData = expensesByCategory();

  const overviewText =
    filterType === "date"
      ? `Overview for ${selectedDate}`
      : `Overview for ${new Date(
          selectedYear,
          selectedMonth - 1
        ).toLocaleString("default", { month: "long", year: "numeric" })}`;

  return (
    <>
      <Header />

      <div
        className="d-flex"
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--bg-primary)",
          overflowX: "hidden",
        }}
      >
        <div className="flex-grow-1">
          <main>
            <div className="d-flex">
              <div className="col-md-3 col-lg-3">
                {!isSmall && <SidebarBody />}
              </div>

              <div className="col-12 col-md-9 col-lg-9 p-4 p-lg-5">
                <div className="mb-4">
                  <h1
                    className="fw-bold mb-1"
                    style={{
                      fontSize: "3rem",
                      color: "#7c3aed",
                      lineHeight: "1.1",
                    }}
                  >
                    Dashboard
                  </h1>

                  <div className="d-flex align-items-center gap-2 text-muted">
                    <span
                      style={{
                        width: "8px",
                        height: "8px",
                        backgroundColor: "#10b981",
                        borderRadius: "50%",
                        display: "inline-block",
                      }}
                    ></span>

                    <span style={{ fontSize: "1rem" }}>{overviewText}</span>
                  </div>
                </div>

                <div className="card border-0 shadow-sm mb-4" style={{ borderRadius: "18px" }}>
                  <div className="card-body p-4">
                    <div className="row g-3 align-items-end">
                      <div className="col-md-3">
                        <label className="form-label fw-semibold">
                          Filter Type
                        </label>
                        <select
                          className="form-select"
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                        >
                          <option value="month">Month / Year</option>
                          <option value="date">Specific Date</option>
                        </select>
                      </div>

                      {filterType === "month" ? (
                        <>
                          <div className="col-md-3">
                            <label className="form-label fw-semibold">
                              Month
                            </label>
                            <select
                              className="form-select"
                              value={selectedMonth}
                              onChange={(e) =>
                                setSelectedMonth(Number(e.target.value))
                              }
                            >
                              {Array.from({ length: 12 }, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {new Date(2026, i).toLocaleString("default", {
                                    month: "long",
                                  })}
                                </option>
                              ))}
                            </select>
                          </div>

                          <div className="col-md-3">
                            <label className="form-label fw-semibold">
                              Year
                            </label>
                            <select
                              className="form-select"
                              value={selectedYear}
                              onChange={(e) =>
                                setSelectedYear(Number(e.target.value))
                              }
                            >
                              {Array.from({ length: 5 }, (_, i) => {
                                const year = today.getFullYear() - i;
                                return (
                                  <option key={year} value={year}>
                                    {year}
                                  </option>
                                );
                              })}
                            </select>
                          </div>
                        </>
                      ) : (
                        <div className="col-md-4">
                          <label className="form-label fw-semibold">
                            Date
                          </label>
                          <input
                            type="date"
                            className="form-control"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                          />
                        </div>
                      )}

                      <div className="col-md-2">
                        <button
                          className="btn btn-primary w-100"
                          onClick={loadDashboardData}
                          style={{
                            background:
                              "linear-gradient(to right, #7c3aed, #a855f7)",
                            border: "none",
                          }}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-md-4">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "5px",
                          background:
                            "linear-gradient(90deg, #8b5cf6, #a855f7)",
                        }}
                      ></div>

                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="text-secondary mb-2 fw-medium">
                              Monthly Income
                            </p>

                            <h2
                              className="fw-bold mb-0"
                              style={{ fontSize: "2.5rem" }}
                            >
                              $
                              {monthlyIncome.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </h2>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: "64px",
                              height: "64px",
                              borderRadius: "16px",
                              backgroundColor: "#f3e8ff",
                              color: "#7c3aed",
                              fontSize: "2rem",
                            }}
                          >
                            $
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "5px",
                          background:
                            "linear-gradient(90deg, #ec4899, #f43f5e)",
                        }}
                      ></div>

                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="text-secondary mb-2 fw-medium">
                              Total Expenses
                            </p>

                            <h2
                              className="fw-bold mb-1"
                              style={{ fontSize: "2.5rem" }}
                            >
                              $
                              {totalExpenses.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </h2>

                            <small
                              style={{
                                color:
                                  totalExpenses > monthlyIncome
                                    ? "#ef4444"
                                    : "#f97316",
                                fontWeight: 500,
                              }}
                            >
                              {monthlyIncome === 0
                                ? "No income set"
                                : `${(
                                    (totalExpenses / monthlyIncome) *
                                    100
                                  ).toFixed(1)}% of income`}
                            </small>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: "64px",
                              height: "64px",
                              borderRadius: "16px",
                              backgroundColor: "#fce7f3",
                              color: "#ec4899",
                              fontSize: "1.8rem",
                            }}
                          >
                            ↘
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "5px",
                          background:
                            "linear-gradient(90deg, #10b981, #14b8a6)",
                        }}
                      ></div>

                      <div className="card-body p-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div>
                            <p className="text-secondary mb-2 fw-medium">
                              Remaining Balance
                            </p>

                            <h2
                              className="fw-bold mb-1"
                              style={{ fontSize: "2.5rem" }}
                            >
                              $
                              {remainingBalance.toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              })}
                            </h2>

                            <small
                              style={{
                                color:
                                  remainingBalance < 0
                                    ? "#ef4444"
                                    : remainingBalance < monthlyIncome * 0.2
                                      ? "#f97316"
                                      : "#10b981",
                                fontWeight: 500,
                              }}
                            >
                              {remainingBalance < 0
                                ? "Over budget!"
                                : remainingBalance < monthlyIncome * 0.2
                                  ? "Low balance"
                                  : "On track"}
                            </small>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: "64px",
                              height: "64px",
                              borderRadius: "16px",
                              backgroundColor: "#d1fae5",
                              color: "#059669",
                              fontSize: "1.8rem",
                            }}
                          >
                            💳
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="row g-4 mb-4">
                  <div className="col-lg-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                        minHeight: "390px",
                      }}
                    >
                      <div
                        style={{
                          height: "5px",
                          background:
                            "linear-gradient(90deg, #8b5cf6, #a855f7, #ec4899)",
                        }}
                      ></div>

                      <div
                        className="px-4 py-3"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(139,92,246,0.05), rgba(255,255,255,1))",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "4px",
                              height: "24px",
                              borderRadius: "999px",
                              backgroundColor: "#8b5cf6",
                            }}
                          ></div>

                          <h5 className="mb-0 fw-bold">
                            Expenses by Category
                          </h5>
                        </div>
                      </div>

                      <div className="card-body p-4">
                        {Object.keys(categoriesData).length > 0 ? (
                          <div className="d-flex flex-column gap-3">
                            {Object.entries(categoriesData)
                              .sort((a, b) => b[1] - a[1])
                              .map(([category, amount]) => (
                                <div
                                  key={category}
                                  className="d-flex justify-content-between align-items-center p-3 rounded-3 border"
                                >
                                  <div>
                                    <span className="fw-semibold">
                                      {category}
                                    </span>

                                    <div
                                      style={{
                                        height: "8px",
                                        backgroundColor: "#e5e7eb",
                                        borderRadius: "4px",
                                        marginTop: "8px",
                                        overflow: "hidden",
                                      }}
                                    >
                                      <div
                                        style={{
                                          height: "100%",
                                          width:
                                            totalExpenses === 0
                                              ? "0%"
                                              : `${(amount / totalExpenses) * 100}%`,
                                          background:
                                            "linear-gradient(to right, #8b5cf6, #a855f7)",
                                        }}
                                      ></div>
                                    </div>
                                  </div>

                                  <span
                                    className="fw-bold"
                                    style={{ color: "#8b5cf6" }}
                                  >
                                    $
                                    {amount.toLocaleString("en-US", {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    })}
                                  </span>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{ minHeight: "250px" }}
                          >
                            <p className="text-muted mb-0">
                              No expense data to display
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: "18px",
                        overflow: "hidden",
                        minHeight: "390px",
                      }}
                    >
                      <div
                        style={{
                          height: "5px",
                          background:
                            "linear-gradient(90deg, #ec4899, #f43f5e, #f97316)",
                        }}
                      ></div>

                      <div
                        className="px-4 py-3"
                        style={{
                          background:
                            "linear-gradient(180deg, rgba(236,72,153,0.05), rgba(255,255,255,1))",
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: "4px",
                              height: "24px",
                              borderRadius: "999px",
                              backgroundColor: "#ec4899",
                            }}
                          ></div>

                          <h5 className="mb-0 fw-bold">
                            Category Breakdown
                          </h5>
                        </div>
                      </div>

                      <div className="card-body p-4">
                        {Object.keys(categoriesData).length > 0 ? (
                          <div className="d-flex flex-column gap-2">
                            {Object.entries(categoriesData)
                              .sort((a, b) => b[1] - a[1])
                              .map(([category, amount]) => (
                                <div
                                  key={category}
                                  className="d-flex justify-content-between align-items-center p-2"
                                >
                                  <span className="text-secondary">
                                    {category}
                                  </span>

                                  <span className="fw-bold">
                                    {totalExpenses === 0
                                      ? "0.0"
                                      : ((amount / totalExpenses) * 100).toFixed(
                                          1
                                        )}
                                    %
                                  </span>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div
                            className="d-flex align-items-center justify-content-center text-center"
                            style={{ minHeight: "250px" }}
                          >
                            <p className="text-muted mb-0">
                              No category data available
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: "18px",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "5px",
                      background:
                        "linear-gradient(90deg, #10b981, #14b8a6)",
                    }}
                  ></div>

                  <div
                    className="px-4 py-3 d-flex justify-content-between align-items-center"
                    style={{
                      background:
                        "linear-gradient(180deg, rgba(16,185,129,0.05), rgba(255,255,255,1))",
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div
                        style={{
                          width: "4px",
                          height: "24px",
                          borderRadius: "999px",
                          backgroundColor: "#10b981",
                        }}
                      ></div>

                      <h5 className="mb-0 fw-bold">Recent Expenses</h5>
                    </div>

                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate("/addExpense")}
                      style={{
                        background: "linear-gradient(to right, #7c3aed, #a855f7)",
                        border: "none",
                      }}
                    >
                      + Add Expense
                    </button>
                  </div>

                  <div className="card-body p-4">
                    {recentExpenses.length > 0 ? (
                      <div className="d-flex flex-column gap-3">
                        {recentExpenses.map((expense) => (
                          <div
                            key={expense.id}
                            className="d-flex justify-content-between align-items-center p-3 rounded-3 border"
                          >
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <span className="fw-semibold">
                                  {expense.category}
                                </span>

                                <small className="text-secondary">
                                  {new Date(expense.date).toLocaleDateString()}
                                </small>
                              </div>

                              {expense.note && (
                                <small className="text-muted d-block">
                                  {expense.note}
                                </small>
                              )}
                            </div>

                            <div className="text-end">
                              <div
                                className="fw-bold fs-5"
                                style={{ color: "#7c3aed" }}
                              >
                                $
                                {expense.amount.toLocaleString("en-US", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                })}
                              </div>

                              <div className="d-flex gap-2 mt-2 justify-content-end">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() =>
                                    navigate("/addExpense", {
                                      state: {
                                        expense: expense.raw,
                                        mode: "edit",
                                      },
                                    })
                                  }
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Edit
                                </button>

                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteExpense(expense.id)}
                                  style={{ fontSize: "0.75rem" }}
                                >
                                  Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div
                        className="d-flex flex-column align-items-center justify-content-center text-center"
                        style={{ minHeight: "220px" }}
                      >
                        <div
                          className="d-flex align-items-center justify-content-center mb-3"
                          style={{
                            width: "56px",
                            height: "56px",
                            borderRadius: "50%",
                            backgroundColor: "#f3e8ff",
                            fontSize: "1.6rem",
                          }}
                        >
                          💸
                        </div>

                        <p
                          className="text-muted mb-3"
                          style={{ fontSize: "1.05rem" }}
                        >
                          No expenses found for this period.
                        </p>

                        <button
                          className="btn btn-primary"
                          onClick={() => navigate("/addExpense")}
                          style={{
                            background:
                              "linear-gradient(to right, #7c3aed, #a855f7)",
                            border: "none",
                          }}
                        >
                          + Add Your First Expense
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;