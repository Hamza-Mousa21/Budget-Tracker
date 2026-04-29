import Sidebar from "../Component/sidebar";
import Header from "../Component/header";
import SidebarBody from "../Component/SidbarBody";
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

const Dashboard = () => {
  const navigate = useNavigate();
  const [isSmall, setIsSmall] = useState(window.innerWidth < 785);
  const [expenses, setExpenses] = useState([]);
  const [monthlyIncome, setMonthlyIncome] = useState(0);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // Load data from localStorage on mount
  useEffect(() => {
    loadExpenses();
    loadMonthlyIncome();
  }, []);

  // Handle responsive design
  useEffect(() => {
    const handleSmallScreen = () => {
      setIsSmall(window.innerWidth < 785);
    };
    window.addEventListener('resize', handleSmallScreen);
    return () => window.removeEventListener('resize', handleSmallScreen);
  }, []);

  // In Dashboard.jsx, add this useEffect to listen for storage changes
useEffect(() => {
  const handleStorageChange = (e) => {
    if (e.key === 'monthlyIncomes') {
      loadMonthlyIncome(); // Reload income when it changes
    }
    if (e.key === 'expenses') {
      loadExpenses(); // Reload expenses when they change
    }
  };
  
  window.addEventListener('storage', handleStorageChange);
  return () => window.removeEventListener('storage', handleStorageChange);
}, [currentMonth]); // Add currentMonth as dependency

  // Load expenses from localStorage
  const loadExpenses = () => {
    try {
      const saved = localStorage.getItem('expenses');
      if (saved) {
        setExpenses(JSON.parse(saved));
      }
    } catch (error) {
      console.error('Error loading expenses:', error);
      setExpenses([]);
    }
  };

  // Load monthly income from localStorage
 // In Dashboard.jsx, update the loadMonthlyIncome function
const loadMonthlyIncome = () => {
  try {
    const saved = localStorage.getItem('monthlyIncomes');
    if (saved) {
      const incomes = JSON.parse(saved);
      const monthKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
      setMonthlyIncome(incomes[monthKey] || 0);
    } else {
      setMonthlyIncome(0);
    }
  } catch (error) {
    console.error('Error loading income:', error);
    setMonthlyIncome(0);
  }
};

  // Save expenses to localStorage
  const saveExpenses = (updatedExpenses) => {
    try {
      localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
      setExpenses(updatedExpenses);
    } catch (error) {
      console.error('Error saving expenses:', error);
    }
  };

  // Add new expense
  const handleAddExpense = (newExpense) => {
    const expenseWithId = {
      ...newExpense,
      id: Date.now(),
      createdAt: new Date().toISOString(),
    };
    const updatedExpenses = [...expenses, expenseWithId];
    saveExpenses(updatedExpenses);
  };

  // Delete expense
  const handleDeleteExpense = (id) => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      const updatedExpenses = expenses.filter(expense => expense.id !== id);
      saveExpenses(updatedExpenses);
    }
  };

  // Edit expense
  const handleEditExpense = (id, updatedExpense) => {
    const updatedExpenses = expenses.map(expense =>
      expense.id === id ? { ...expense, ...updatedExpense } : expense
    );
    saveExpenses(updatedExpenses);
  };

  // Get expenses for current month
  const getCurrentMonthExpenses = () => {
    const monthKey = `${currentMonth.getFullYear()}-${String(currentMonth.getMonth() + 1).padStart(2, '0')}`;
    return expenses.filter(expense => expense.date.startsWith(monthKey));
  };

  // Calculate totals for current month
  const monthExpenses = getCurrentMonthExpenses();
  const totalExpenses = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remainingBalance = monthlyIncome - totalExpenses;

  // Get expenses by category
  const expensesByCategory = () => {
    const categories = {};
    monthExpenses.forEach(expense => {
      if (!categories[expense.category]) {
        categories[expense.category] = 0;
      }
      categories[expense.category] += expense.amount;
    });
    return categories;
  };

  // Get recent expenses (last 10)
  const recentExpenses = monthExpenses
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  const categoriesData = expensesByCategory();
  const monthName = currentMonth.toLocaleString('default', { month: 'long', year: 'numeric' });

  return (
    <>
      <Header />

      <div
        className="d-flex"
        style={{
          minHeight: '100vh',
          backgroundColor: 'var(--bg-primary)',
          overflowX: 'hidden',
        }}
      >
        {/* Main Content */}
        <div className="flex-grow-1">
          <main className="">
            {/* Title */}
            <div className="d-flex">
              <div className="col-md-3 col-lg-3">
                {!isSmall && <SidebarBody />}
              </div>
              <div className="col-12 col-md-9 col-lg-9 p-4 p-lg-5">
                <div className="mb-4">
                  <h1
                    className="fw-bold mb-1"
                    style={{
                      fontSize: '3rem',
                      color: '#7c3aed',
                      lineHeight: '1.1',
                    }}
                  >
                    Dashboard
                  </h1>

                  <div className="d-flex align-items-center gap-2 text-muted">
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        backgroundColor: '#10b981',
                        borderRadius: '50%',
                        display: 'inline-block',
                      }}
                    ></span>
                    <span style={{ fontSize: '1rem' }}>
                      Overview for {monthName}
                    </span>
                  </div>
                </div>

                {/* Top Cards */}
                <div className="row g-4 mb-4">
                  {/* Monthly Income */}
                  <div className="col-md-4">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: '18px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '5px',
                          background: 'linear-gradient(90deg, #8b5cf6, #a855f7)',
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
                              style={{ fontSize: '2.5rem' }}
                            >
                              ${monthlyIncome.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </h2>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '16px',
                              backgroundColor: '#f3e8ff',
                              color: '#7c3aed',
                              fontSize: '2rem',
                            }}
                          >
                            $
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Total Expenses */}
                  <div className="col-md-4">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: '18px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '5px',
                          background: 'linear-gradient(90deg, #ec4899, #f43f5e)',
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
                              style={{ fontSize: '2.5rem' }}
                            >
                              ${totalExpenses.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </h2>
                            <small
                              style={{
                                color: totalExpenses > monthlyIncome ? '#ef4444' : '#f97316',
                                fontWeight: 500,
                              }}
                            >
                              {monthlyIncome === 0
                                ? 'No income set'
                                : `${((totalExpenses / monthlyIncome) * 100).toFixed(1)}% of income`}
                            </small>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '16px',
                              backgroundColor: '#fce7f3',
                              color: '#ec4899',
                              fontSize: '1.8rem',
                            }}
                          >
                            ↘
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Remaining Balance */}
                  <div className="col-md-4">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: '18px',
                        overflow: 'hidden',
                      }}
                    >
                      <div
                        style={{
                          height: '5px',
                          background: 'linear-gradient(90deg, #10b981, #14b8a6)',
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
                              style={{ fontSize: '2.5rem' }}
                            >
                              ${remainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </h2>
                            <small
                              style={{
                                color:
                                  remainingBalance < 0
                                    ? '#ef4444'
                                    : remainingBalance < monthlyIncome * 0.2
                                      ? '#f97316'
                                      : '#10b981',
                                fontWeight: 500,
                              }}
                            >
                              {remainingBalance < 0
                                ? 'Over budget!'
                                : remainingBalance < monthlyIncome * 0.2
                                  ? 'Low balance'
                                  : 'On track'}
                            </small>
                          </div>

                          <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                              width: '64px',
                              height: '64px',
                              borderRadius: '16px',
                              backgroundColor: '#d1fae5',
                              color: '#059669',
                              fontSize: '1.8rem',
                            }}
                          >
                            💳
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Middle Section */}
                <div className="row g-4 mb-4">
                  {/* Expenses by Category */}
                  <div className="col-lg-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: '18px',
                        overflow: 'hidden',
                        minHeight: '390px',
                      }}
                    >
                      <div
                        style={{
                          height: '5px',
                          background: 'linear-gradient(90deg, #8b5cf6, #a855f7, #ec4899)',
                        }}
                      ></div>

                      <div
                        className="px-4 py-3"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(139,92,246,0.05), rgba(255,255,255,1))',
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: '4px',
                              height: '24px',
                              borderRadius: '999px',
                              backgroundColor: '#8b5cf6',
                            }}
                          ></div>
                          <h5 className="mb-0 fw-bold">Expenses by Category</h5>
                        </div>
                      </div>

                      <div className="card-body p-4">
                        {Object.keys(categoriesData).length > 0 ? (
                          <div className="d-flex flex-column gap-3">
                            {Object.entries(categoriesData)
                              .sort((a, b) => b[1] - a[1])
                              .map(([category, amount]) => (
                                <div key={category} className="d-flex justify-content-between align-items-center p-3 rounded-3 border" style={{ borderWidth: '1px' }}>
                                  <div>
                                    <span className="fw-semibold">{category}</span>
                                    <div
                                      style={{
                                        height: '8px',
                                        backgroundColor: '#e5e7eb',
                                        borderRadius: '4px',
                                        marginTop: '8px',
                                        overflow: 'hidden',
                                      }}
                                    >
                                      <div
                                        style={{
                                          height: '100%',
                                          width: `${(amount / totalExpenses) * 100}%`,
                                          background: 'linear-gradient(to right, #8b5cf6, #a855f7)',
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                  <span className="fw-bold" style={{ color: '#8b5cf6' }}>
                                    ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                  </span>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '250px' }}>
                            <p className="text-muted mb-0">No expense data to display</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Category Breakdown */}
                  <div className="col-lg-6">
                    <div
                      className="card border-0 shadow-sm h-100"
                      style={{
                        borderRadius: '18px',
                        overflow: 'hidden',
                        minHeight: '390px',
                      }}
                    >
                      <div
                        style={{
                          height: '5px',
                          background: 'linear-gradient(90deg, #ec4899, #f43f5e, #f97316)',
                        }}
                      ></div>

                      <div
                        className="px-4 py-3"
                        style={{
                          background:
                            'linear-gradient(180deg, rgba(236,72,153,0.05), rgba(255,255,255,1))',
                        }}
                      >
                        <div className="d-flex align-items-center gap-2">
                          <div
                            style={{
                              width: '4px',
                              height: '24px',
                              borderRadius: '999px',
                              backgroundColor: '#ec4899',
                            }}
                          ></div>
                          <h5 className="mb-0 fw-bold">Category Breakdown</h5>
                        </div>
                      </div>

                      <div className="card-body p-4">
                        {Object.keys(categoriesData).length > 0 ? (
                          <div className="d-flex flex-column gap-2">
                            {Object.entries(categoriesData)
                              .sort((a, b) => b[1] - a[1])
                              .map(([category, amount]) => (
                                <div key={category} className="d-flex justify-content-between align-items-center p-2">
                                  <span className="text-secondary">{category}</span>
                                  <span className="fw-bold">
                                    {((amount / totalExpenses) * 100).toFixed(1)}%
                                  </span>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <div className="d-flex align-items-center justify-content-center text-center" style={{ minHeight: '250px' }}>
                            <p className="text-muted mb-0">No category data available</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Recent Expenses */}
                <div
                  className="card border-0 shadow-sm"
                  style={{
                    borderRadius: '18px',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      height: '5px',
                      background: 'linear-gradient(90deg, #10b981, #14b8a6)',
                    }}
                  ></div>

                  <div
                    className="px-4 py-3 d-flex justify-content-between align-items-center"
                    style={{
                      background:
                        'linear-gradient(180deg, rgba(16,185,129,0.05), rgba(255,255,255,1))',
                    }}
                  >
                    <div className="d-flex align-items-center gap-2">
                      <div
                        style={{
                          width: '4px',
                          height: '24px',
                          borderRadius: '999px',
                          backgroundColor: '#10b981',
                        }}
                      ></div>
                      <h5 className="mb-0 fw-bold">Recent Expenses</h5>
                    </div>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => navigate('/addExpense')}
                      style={{ background: 'linear-gradient(to right, #7c3aed, #a855f7)', border: 'none' }}
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
                            style={{ borderWidth: '1px' }}
                          >
                            <div className="flex-grow-1">
                              <div className="d-flex align-items-center gap-2 mb-2">
                                <span className="fw-semibold">{expense.category}</span>
                                <small className="text-secondary">{new Date(expense.date).toLocaleDateString()}</small>
                              </div>
                              {expense.note && (
                                <small className="text-muted d-block">{expense.note}</small>
                              )}
                            </div>
                            <div className="text-end">
                              <div className="fw-bold fs-5" style={{ color: '#7c3aed' }}>
                                ${expense.amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                              </div>
                              <div className="d-flex gap-2 mt-2 justify-content-end">
                                <button
                                  className="btn btn-sm btn-outline-primary"
                                  onClick={() => navigate('/edit-expense', { state: { expense } })}
                                  style={{ fontSize: '0.75rem' }}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-sm btn-outline-danger"
                                  onClick={() => handleDeleteExpense(expense.id)}
                                  style={{ fontSize: '0.75rem' }}
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
                        style={{ minHeight: '220px' }}
                      >
                        <div
                          className="d-flex align-items-center justify-content-center mb-3"
                          style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '50%',
                            backgroundColor: '#f3e8ff',
                            fontSize: '1.6rem',
                          }}
                        >
                          💸
                        </div>

                        <p className="text-muted mb-3" style={{ fontSize: '1.05rem' }}>
                          No expenses yet. Add your first expense to get started!
                        </p>

                        <button
                          className="btn btn-primary"
                          onClick={() => navigate('/addExpense')}
                          style={{ background: 'linear-gradient(to right, #7c3aed, #a855f7)', border: 'none' }}
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