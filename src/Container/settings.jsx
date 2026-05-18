// Settings.jsx - API-connected version
import { useState, useEffect } from 'react';
import Header from '../Component/header';
import SidebarBody from '../Component/SidbarBody';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export function Settings() {
  const currentDate = new Date();

  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());
  const [income, setIncome] = useState('');
  const [monthlyIncomes, setMonthlyIncomes] = useState([]);
  const [isSmall, setIsSmall] = useState(window.innerWidth < 785);
  const [loading, setLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];

  const years = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i);

  const getAuthHeaders = () => ({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  });

  const findCurrentRecord = (records = monthlyIncomes) => {
    return records.find(
      (record) => record.month === selectedMonth + 1 && record.year === selectedYear
    );
  };

  const fetchMonthlyIncomes = async () => {
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE}/monthly-incomes`, {
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch incomes');
      }

      const data = await response.json();
      const records = Array.isArray(data) ? data : data.data || [];

      setMonthlyIncomes(records);
      return records;
    } catch (error) {
      console.error('Error fetching monthly incomes:', error);
      setMonthlyIncomes([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMonthlyIncomes();
  }, []);

  useEffect(() => {
    const record = findCurrentRecord();
    setIncome(record ? String(record.amount ?? '') : '');
  }, [selectedMonth, selectedYear, monthlyIncomes]);

  useEffect(() => {
    const handleResize = () => setIsSmall(window.innerWidth < 785);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSave = async () => {
    const newIncome = parseFloat(income);

    if (income.trim() === '' || isNaN(newIncome) || newIncome < 0) {
      alert('Please enter a valid income amount');
      return;
    }

    setSaveLoading(true);

    try {
      const response = await fetch(`${API_BASE}/monthly-incomes`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          amount: newIncome,
          month: selectedMonth + 1,
          year: selectedYear,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save income');
      }

      await fetchMonthlyIncomes();
      alert(`Income updated successfully for ${months[selectedMonth]} ${selectedYear}!`);
    } catch (error) {
      console.error('Error saving income:', error);
      alert('Error saving income');
    } finally {
      setSaveLoading(false);
    }
  };

  const handleDeleteCurrentIncome = async () => {
    const currentIncome = findCurrentRecord();

    if (!currentIncome) {
      alert('No income saved for this month');
      return;
    }

    if (!window.confirm(`Delete income for ${months[selectedMonth]} ${selectedYear}?`)) {
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/monthly-incomes/${currentIncome.id}`, {
        method: 'DELETE',
        headers: getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Failed to delete monthly income');
      }

      await fetchMonthlyIncomes();
      setIncome('');

      alert('Monthly income deleted successfully');
    } catch (error) {
      console.error('Error deleting monthly income:', error);
      alert('Error deleting income');
    }
  };

  const incomesMap = monthlyIncomes.reduce((acc, record) => {
    const key = `${record.year}-${String(record.month).padStart(2, '0')}`;
    acc[key] = Number(record.amount || 0);
    return acc;
  }, {});

  return (
    <>
      <Header />

      <div className="d-flex">
        <div className="col-md-3 col-lg-3">
          {!isSmall && <SidebarBody />}
        </div>

        <div className="p-5 col-12 col-md-9 col-lg-9">
          <div className="mb-4">
            <h2 className="fw-bold">Settings</h2>
            <p className="text-muted">Manage your budget preferences</p>
          </div>

          <div style={{ maxWidth: '720px' }}>
            <div className="card shadow-lg mb-4">
              <div className="card-body p-4">
                <div className="row g-3 mb-3">
                  <div className="col">
                    <label className="form-label">Month</label>
                    <select
                      className="form-select"
                      value={selectedMonth}
                      onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                    >
                      {months.map((month, i) => (
                        <option key={month} value={i}>{month}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col">
                    <label className="form-label">Year</label>
                    <select
                      className="form-select"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                    >
                      {years.map((year) => (
                        <option key={year} value={year}>{year}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="form-label">Income Amount ($)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="0.00"
                    value={income}
                    onChange={(e) => setIncome(e.target.value)}
                    className="form-control form-control-lg"
                    style={{ borderWidth: '2px' }}
                  />
                  <small className="text-muted">
                    Current income for {months[selectedMonth]} {selectedYear}
                  </small>
                </div>

                <button
                  onClick={handleSave}
                  disabled={saveLoading}
                  className="btn btn-primary w-100"
                  style={{
                    background: 'linear-gradient(to right, #7c3aed, #a855f7)',
                    border: 'none'
                  }}
                >
                  {saveLoading ? 'Saving…' : 'Save Income'}
                </button>

                <button
                  onClick={handleDeleteCurrentIncome}
                  className="btn btn-outline-danger w-100 mt-2"
                  disabled={!findCurrentRecord()}
                >
                  Delete This Month Income
                </button>
              </div>
            </div>

            <div className="card border-0 shadow-lg overflow-hidden mb-4">
              <div style={{ height: '4px', background: 'linear-gradient(to right, #ec4899, #f43f5e, #f97316)' }} />
              <div className="card-header border-bottom py-3 px-4" style={{ background: 'linear-gradient(135deg, rgba(236,72,153,0.05), rgba(244,63,94,0.05))' }}>
                <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                  <span style={{ width: '4px', height: '24px', background: 'linear-gradient(to bottom, #ec4899, #f43f5e)', borderRadius: '4px', display: 'inline-block' }} />
                  Income Overview
                </h5>
                <small className="text-muted">View all months with configured income</small>
              </div>

              <div className="card-body p-4">
                {loading ? (
                  <div className="text-center py-4">
                    <div className="spinner-border text-primary" role="status" />
                  </div>
                ) : Object.keys(incomesMap).length > 0 ? (
                  <div className="d-flex flex-column gap-2">
                    {Object.entries(incomesMap)
                      .sort(([a], [b]) => b.localeCompare(a))
                      .map(([monthKey, incomeValue]) => {
                        const [year, month] = monthKey.split('-');
                        const monthName = months[parseInt(month) - 1];

                        return (
                          <div
                            key={monthKey}
                            className="d-flex justify-content-between align-items-center p-3 rounded-3 border"
                            style={{
                              borderWidth: '2px',
                              background: 'rgba(124,58,237,0.03)'
                            }}
                          >
                            <span className="fw-semibold d-flex align-items-center gap-2">
                              <span
                                className="rounded-circle d-inline-block"
                                style={{
                                  width: '8px',
                                  height: '8px',
                                  backgroundColor: '#7c3aed'
                                }}
                              />
                              {monthName} {year}
                            </span>

                            <span
                              className="fw-bold fs-5"
                              style={{
                                background: 'linear-gradient(to right, #7c3aed, #a855f7)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                              }}
                            >
                              ${Number(incomeValue).toLocaleString('en-US', {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2
                              })}
                            </span>
                          </div>
                        );
                      })}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <div
                      className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                      style={{
                        width: '64px',
                        height: '64px',
                        background: 'linear-gradient(135deg, #ede9fe, #f3e8ff)'
                      }}
                    >
                      <span style={{ fontSize: '1.8rem' }}>💰</span>
                    </div>
                    <p className="text-muted fw-medium mb-0">
                      No income has been set for any month yet.
                    </p>
                    <small className="text-muted">
                      Use the form above to set your monthly income
                    </small>
                  </div>
                )}
              </div>
            </div>

            <div className="card border-0 shadow-lg overflow-hidden mb-4">
              <div style={{ height: '4px', background: 'linear-gradient(to right, #10b981, #14b8a6, #06b6d4)' }} />
              <div className="card-header border-bottom py-3 px-4" style={{ background: 'linear-gradient(135deg, rgba(16,185,129,0.05), rgba(20,184,166,0.05))' }}>
                <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                  <span style={{ width: '4px', height: '24px', background: 'linear-gradient(to bottom, #10b981, #14b8a6)', borderRadius: '4px', display: 'inline-block' }} />
                  About Budget Tracker
                </h5>
                <small className="text-muted">Version 1.0.0</small>
              </div>

              <div className="card-body p-4">
                <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                  Budget Tracker helps you manage your finances by tracking expenses,
                  analyzing spending patterns, and staying on top of your budget goals.
                  Your income data is stored securely in the database.
                </p>
              </div>
            </div>

            <div className="card border-0 shadow-lg overflow-hidden mb-4">
              <div style={{ height: '4px', background: 'linear-gradient(to right, #ef4444, #f43f5e, #ec4899)' }} />
              <div className="card-header border-bottom py-3 px-4" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.05), rgba(244,63,94,0.05))' }}>
                <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
                  <span style={{ width: '4px', height: '24px', background: 'linear-gradient(to bottom, #ef4444, #f43f5e)', borderRadius: '4px', display: 'inline-block' }} />
                  Data Management
                </h5>
                <small className="text-muted">Income data is saved in the backend database</small>
              </div>

              <div className="card-body p-4">
                <p className="text-muted mb-0" style={{ lineHeight: '1.7' }}>
                  Your monthly income is saved in the backend database and will appear
                  on the Dashboard for the selected month and year. You can update it
                  by entering a new amount and clicking Save Income, or delete the
                  selected month using Delete This Month Income.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Settings;