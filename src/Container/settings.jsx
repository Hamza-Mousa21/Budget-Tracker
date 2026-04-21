import { useState, useEffect } from 'react';
import Header from '../Component/header';
import SidebarBody from '../Component/SidbarBody';

export function Settings({ monthlyIncomes = {}, onUpdateIncome }) {
  const currentDate = new Date();
  const [selectedYear, setSelectedYear] = useState(currentDate.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(currentDate.getMonth());

  const selectedMonthKey = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}`;

  const [income, setIncome] = useState(() => {
    const value = monthlyIncomes[selectedMonthKey] || 0;
    return value.toString();
  });

  useEffect(() => {
    const value = monthlyIncomes[selectedMonthKey] || 0;
    setIncome(value.toString());
  }, [selectedMonthKey, monthlyIncomes]);

  const handleSave = () => {
    const newIncome = parseFloat(income);
    if (isNaN(newIncome) || newIncome < 0) {
      alert('Please enter a valid income amount');
      return;
    }
    if (onUpdateIncome) onUpdateIncome(selectedMonthKey, newIncome);
    alert('Income updated successfully!');
  };

  const months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];

  const years = Array.from({ length: 5 }, (_, i) => currentDate.getFullYear() - 2 + i);
  const safeMonthlyIncomes = monthlyIncomes || {};

const [isSmall,setIsSmall]=useState(window.innerWidth<785)
useEffect(()=>{
    const handleSmallScreen=()=>{
        setIsSmall(window.innerWidth<785)
    }
    window.addEventListener("resize",handleSmallScreen)
    return ()=> window.removeEventListener("resize",handleSmallScreen)
})

  return (
    <>
    <Header></Header>
    <div className="d-flex">
    <div className="col-md-3 col-lg-3">
       {!isSmall &&<SidebarBody></SidebarBody>}
    </div>
    <div className="p-5 col-12 col-md-9 col-lg-9">

      {/* Page Title */}
      <div className="mb-4">
        <h2 className="fw-bold" style={{
          fontSize: '2.2rem',
          background: 'linear-gradient(135deg, #2563eb, #06b6d4, #0d9488)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Settings
        </h2>
        <p className="text-muted d-flex align-items-center gap-2">
          <span className="rounded-circle bg-primary d-inline-block" style={{ width: '8px', height: '8px' }} />
          Manage your budget preferences
        </p>
      </div>

      <div style={{ maxWidth: '720px' }}>

        {/* Monthly Income Card */}
        <div className="card border-0 shadow-lg overflow-hidden mb-4">
          <div style={{ height: '4px', background: 'linear-gradient(to right, #7c3aed, #a855f7, #ec4899)' }} />
          <div className="card-header border-bottom py-3 px-4" style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(168,85,247,0.05))' }}>
            <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
              <span style={{ width: '4px', height: '24px', background: 'linear-gradient(to bottom, #7c3aed, #a855f7)', borderRadius: '4px', display: 'inline-block' }} />
              Monthly Income
            </h5>
            <small className="text-muted">Set your income for each month to track your budget and spending</small>
          </div>
          <div className="card-body p-4">

            <div className="row g-3 mb-3">
              {/* Month */}
              <div className="col">
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <span className="rounded-circle d-inline-block" style={{ width: '8px', height: '8px', backgroundColor: '#ec4899' }} />
                  Month
                </label>
                <select
                  className="form-select form-select-lg"
                  style={{ borderWidth: '2px' }}
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                >
                  {months.map((month, index) => (
                    <option key={month} value={index}>{month}</option>
                  ))}
                </select>
              </div>

              {/* Year */}
              <div className="col-auto" style={{ width: '140px' }}>
                <label className="form-label fw-semibold d-flex align-items-center gap-2">
                  <span className="rounded-circle d-inline-block" style={{ width: '8px', height: '8px', backgroundColor: '#f97316' }} />
                  Year
                </label>
                <select
                  className="form-select form-select-lg"
                  style={{ borderWidth: '2px' }}
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Income Amount */}
            <div className="mb-3">
              <label className="form-label fw-semibold d-flex align-items-center gap-2">
                <span className="rounded-circle bg-success d-inline-block" style={{ width: '8px', height: '8px' }} />
                Income Amount
              </label>
              <input
                type="number"
                step="0.01"
                placeholder="0.00"
                value={income}
                onChange={(e) => setIncome(e.target.value)}
                className="form-control form-control-lg"
                style={{ borderWidth: '2px' }}
              />
            </div>

            <button
              onClick={handleSave}
              className="btn btn-lg w-100 text-white fw-semibold"
              style={{ background: 'linear-gradient(to right, #7c3aed, #a855f7)', border: 'none' }}
            >
              ✓ Save Changes
            </button>
          </div>
        </div>

        {/* Income Overview Card */}
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
            {Object.keys(safeMonthlyIncomes).length > 0 ? (
              <div className="d-flex flex-column gap-2">
                {Object.entries(safeMonthlyIncomes)
                  .sort(([a], [b]) => b.localeCompare(a))
                  .map(([monthKey, incomeValue]) => {
                    const [year, month] = monthKey.split('-');
                    const monthName = months[parseInt(month) - 1];
                    return (
                      <div key={monthKey} className="d-flex justify-content-between align-items-center p-3 rounded-3 border" style={{ borderWidth: '2px', background: 'rgba(124,58,237,0.03)' }}>
                        <span className="fw-semibold d-flex align-items-center gap-2">
                          <span className="rounded-circle d-inline-block" style={{ width: '8px', height: '8px', backgroundColor: '#7c3aed' }} />
                          {monthName} {year}
                        </span>
                        <span className="fw-bold fs-5" style={{
                          background: 'linear-gradient(to right, #7c3aed, #a855f7)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent'
                        }}>
                          ${incomeValue.toLocaleString()}
                        </span>
                      </div>
                    );
                  })}
              </div>
            ) : (
              <div className="text-center py-4">
                <div className="rounded-circle d-flex align-items-center justify-content-center mx-auto mb-3"
                  style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #ede9fe, #f3e8ff)' }}>
                  <span style={{ fontSize: '1.8rem' }}>💰</span>
                </div>
                <p className="text-muted fw-medium mb-0">No income has been set for any month yet.</p>
              </div>
            )}
          </div>
        </div>

        {/* About Card */}
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
            </p>
          </div>
        </div>

        {/* Data Management Card */}
        <div className="card border-0 shadow-lg overflow-hidden mb-4" style={{ border: '2px solid #fecaca !important' }}>
          <div style={{ height: '4px', background: 'linear-gradient(to right, #ef4444, #f43f5e, #ec4899)' }} />
          <div className="card-header border-bottom py-3 px-4" style={{ background: 'linear-gradient(135deg, rgba(239,68,68,0.05), rgba(244,63,94,0.05))' }}>
            <h5 className="mb-0 fw-bold d-flex align-items-center gap-2">
              <span style={{ width: '4px', height: '24px', background: 'linear-gradient(to bottom, #ef4444, #f43f5e)', borderRadius: '4px', display: 'inline-block' }} />
              Data Management
            </h5>
            <small className="text-muted">Your data is stored locally in your browser</small>
          </div>
          <div className="card-body p-4">
            <p className="text-muted mb-3" style={{ lineHeight: '1.7' }}>
              All your expenses and settings are saved in your browser's local storage.
              Your data will persist across sessions but will be cleared if you clear your browser data.
            </p>
            <button
              className="btn text-white fw-semibold"
              style={{ background: 'linear-gradient(to right, #ef4444, #dc2626)', border: 'none' }}
              onClick={() => {
                if (window.confirm('Are you sure you want to clear all data? This cannot be undone.')) {
                  localStorage.removeItem('budget-tracker-data');
                  window.location.reload();
                }
              }}
            >
              Clear All Data
            </button>
          </div>
        </div>

      </div>
    </div>
    
    </div>
    </>
  );
}