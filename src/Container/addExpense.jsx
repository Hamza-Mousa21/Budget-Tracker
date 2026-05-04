// ./Container/addExpense.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../Component/header';
import SidebarBody from '../Component/SidbarBody';

const CATEGORIES = [
  'Food',
  'Transportation',
  'Bills',
  'Shopping',
  'Entertainment',
  'Other',
];

export function AddExpense() {
  const navigate = useNavigate();
  const location = useLocation();

  const expense = location.state?.expense;
  const mode = location.state?.mode || 'add';

  const [formData, setFormData] = useState({
    amount: expense?.amount || '',
    category: expense?.category || '',
    date: expense?.date || new Date().toISOString().split('T')[0],
    note: expense?.note || '',
  });

  const [errors, setErrors] = useState({});
  const [isSmall, setIsSmall] = useState(window.innerWidth < 785);

  useEffect(() => {
    const handleSmallScreen = () => {
      setIsSmall(window.innerWidth < 785);
    };

    window.addEventListener('resize', handleSmallScreen);
    return () => window.removeEventListener('resize', handleSmallScreen);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === 'amount' ? value : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.amount || formData.amount === '') {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(formData.amount)) {
      newErrors.amount = 'Please enter a valid number';
    } else if (parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const saveExpenseToLocalStorage = (expenseData) => {
    try {
      const saved = localStorage.getItem('expenses');
      let expenses = saved ? JSON.parse(saved) : [];

      if (mode === 'edit' && expense?.id) {
        expenses = expenses.map((item) =>
          item.id === expense.id
            ? {
                ...item,
                ...expenseData,
                id: expense.id,
                createdAt: item.createdAt,
                updatedAt: new Date().toISOString(),
              }
            : item
        );
      } else {
        const expenseWithId = {
          ...expenseData,
          id: Date.now(),
          createdAt: new Date().toISOString(),
        };

        expenses.push(expenseWithId);
      }

      localStorage.setItem('expenses', JSON.stringify(expenses));
      return true;
    } catch (error) {
      console.error('Error saving expense:', error);
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const expenseData = {
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      note: formData.note,
    };

    const success = saveExpenseToLocalStorage(expenseData);

    if (success) {
      navigate('/dashboard');
    } else {
      alert('Error saving expense. Please try again.');
    }
  };

  return (
    <>
      <Header />

      <div className="d-flex">
        <div className="col-md-3 col-lg-3">
          {!isSmall && <SidebarBody />}
        </div>

        <div className="container col-12 col-md-9 col-lg-9 pt-4">
          <div className="mb-4 p-3">
            <h1>{mode === 'add' ? 'Add new expense' : 'Edit expense'}</h1>

            <label htmlFor="amount" className="form-label fw-semibold d-flex align-items-center gap-2">
              <span
                className="rounded-circle d-inline-block"
                style={{ width: '8px', height: '8px', backgroundColor: 'green' }}
              />
              {mode === 'add'
                ? 'Track your spending by adding a new expense'
                : 'Update your saved expense information'}
            </label>
          </div>

          <div className="bt-4"></div>

          <div className="card border-0 shadow-lg overflow-hidden" style={{ width: '75%', margin: '0 auto' }}>
            <div style={{ height: '4px', background: 'linear-gradient(to right, #7c3aed, #a855f7, #ec4899)' }} />

            <div
              className="card-header border-bottom py-4 px-4"
              style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(168,85,247,0.05))' }}
            >
              <h5 className="mb-0 fw-bold fs-4 d-flex align-items-center gap-2">
                <span
                  style={{
                    width: '4px',
                    height: '32px',
                    background: 'linear-gradient(to bottom, #7c3aed, #a855f7)',
                    borderRadius: '4px',
                    display: 'inline-block',
                  }}
                />
                {mode === 'add' ? 'Add New Expense' : 'Edit Expense'}
              </h5>
            </div>

            <div className="card-body p-4">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="amount" className="form-label fw-semibold d-flex align-items-center gap-2">
                    <span className="rounded-circle bg-primary d-inline-block" style={{ width: '8px', height: '8px' }} />
                    Amount *
                  </label>

                  <input
                    id="amount"
                    type="number"
                    name="amount"
                    step="0.01"
                    min="0"
                    placeholder="0.00"
                    value={formData.amount}
                    onChange={handleChange}
                    className={`form-control form-control-lg ${errors.amount ? 'is-invalid' : ''}`}
                    style={{ borderWidth: '2px' }}
                  />

                  {errors.amount && (
                    <div className="invalid-feedback d-block mt-2" style={{ color: '#ef4444' }}>
                      ⚠️ {errors.amount}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="category" className="form-label fw-semibold d-flex align-items-center gap-2">
                    <span
                      className="rounded-circle d-inline-block"
                      style={{ width: '8px', height: '8px', backgroundColor: '#ec4899' }}
                    />
                    Category *
                  </label>

                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className={`form-select form-select-lg ${errors.category ? 'is-invalid' : ''}`}
                    style={{ borderWidth: '2px' }}
                  >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>

                  {errors.category && (
                    <div className="invalid-feedback d-block mt-2" style={{ color: '#ef4444' }}>
                      ⚠️ {errors.category}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="date" className="form-label fw-semibold d-flex align-items-center gap-2">
                    <span className="rounded-circle bg-success d-inline-block" style={{ width: '8px', height: '8px' }} />
                    Date *
                  </label>

                  <input
                    id="date"
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className={`form-control form-control-lg ${errors.date ? 'is-invalid' : ''}`}
                    style={{ borderWidth: '2px' }}
                  />

                  {errors.date && (
                    <div className="invalid-feedback d-block mt-2" style={{ color: '#ef4444' }}>
                      ⚠️ {errors.date}
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  <label htmlFor="note" className="form-label fw-semibold d-flex align-items-center gap-2">
                    <span
                      className="rounded-circle d-inline-block"
                      style={{ width: '8px', height: '8px', backgroundColor: '#f97316' }}
                    />
                    Note (Optional)
                  </label>

                  <textarea
                    id="note"
                    name="note"
                    placeholder="Add a description..."
                    value={formData.note}
                    onChange={handleChange}
                    rows={4}
                    className="form-control"
                    style={{ borderWidth: '2px', resize: 'none' }}
                  />
                </div>

                <div className="d-flex gap-3 pt-2">
                  <button
                    type="submit"
                    className="btn btn-lg flex-grow-1 text-white fw-semibold"
                    style={{ background: 'linear-gradient(to right, #7c3aed, #a855f7)', border: 'none' }}
                  >
                    {mode === 'add' ? '✓ Add Expense' : '✓ Update Expense'}
                  </button>

                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-lg px-4"
                    onClick={() => navigate('/dashboard')}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddExpense;