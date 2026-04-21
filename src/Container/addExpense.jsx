import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router';
import Header from '../Component/header';
import Sidebar from '../Component/sidebar';
import SidebarBody from '../Component/SidbarBody';

const CATEGORIES = [
  'Food',
  'Transportation',
  'Bills',
  'Shopping',
  'Entertainment',
  'Other',
];

export function AddExpense({ expense, onSubmit, mode = 'add' }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    amount: expense?.amount.toString() || '',
    category: expense?.category || '',
    date: expense?.date || new Date().toISOString().split('T')[0],
    note: expense?.note || '',
  });
  

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.amount || !formData.category || !formData.date) {
      alert('Please fill in all required fields');
      return;
    }
    onSubmit({
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date,
      note: formData.note,
    });
    navigate('/dashboard');
  };

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
    <div className="col-md-3 col-lg-3 shadow-lg" >
        {!isSmall && <SidebarBody></SidebarBody>}
    </div>
    <div className="container col-12 col-md-9 col-lg-9 pt-4">
      
       <div className="mb-4 p-3">
            <h1>Add new expense</h1> 
            <label htmlFor="amount" className="form-label fw-semibold d-flex align-items-center gap-2">
              <span className="rounded-circle d-inline-block" style={{ width: '8px', height: '8px',backgroundColor:"green" }} />
              Track your spending by adding a new expense
            </label>
         
          </div>
      <div className="bt-4"></div>  
    <div className=" card border-0 shadow-lg overflow-hidden" style={{width:"75%", margin: '0 auto' }}>
      {/* Top gradient bar */}
      <div style={{ height: '4px', background: 'linear-gradient(to right, #7c3aed, #a855f7, #ec4899)' }} />

      {/* Card Header */}
      <div
        className="card-header border-bottom py-4 px-4"
        style={{ background: 'linear-gradient(135deg, rgba(124,58,237,0.05), rgba(168,85,247,0.05))' }}
      >
        <h5 className="mb-0 fw-bold fs-4 d-flex align-items-center gap-2">
          <span style={{
            width: '4px',
            height: '32px',
            background: 'linear-gradient(to bottom, #7c3aed, #a855f7)',
            borderRadius: '4px',
            display: 'inline-block'
          }} />
          {mode === 'add' ? 'Add New Expense' : 'Edit Expense'}
        </h5>
      </div>

      {/* Card Body */}
      <div className="card-body p-4">
        <form onSubmit={handleSubmit}>

          {/* Amount */}
          <div className="mb-4">
            <label htmlFor="amount" className="form-label fw-semibold d-flex align-items-center gap-2">
              <span className="rounded-circle bg-primary d-inline-block" style={{ width: '8px', height: '8px' }} />
              Amount *
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              required
              className="form-control form-control-lg"
              style={{ borderWidth: '2px' }}
            />
          </div>

          {/* Category */}
          <div className="mb-4">
            <label htmlFor="category" className="form-label fw-semibold d-flex align-items-center gap-2">
              <span className="rounded-circle d-inline-block" style={{ width: '8px', height: '8px', backgroundColor: '#ec4899' }} />
              Category *
            </label>
            <select
              id="category"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
              className="form-select form-select-lg"
              style={{ borderWidth: '2px' }}
            >
              <option value="">Select a category</option>
              {CATEGORIES.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          {/* Date */}
          <div className="mb-4">
            <label htmlFor="date" className="form-label fw-semibold d-flex align-items-center gap-2">
              <span className="rounded-circle bg-success d-inline-block" style={{ width: '8px', height: '8px' }} />
              Date *
            </label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="form-control form-control-lg"
              style={{ borderWidth: '2px' }}
            />
          </div>

          {/* Note */}
          <div className="mb-4">
            <label htmlFor="note" className="form-label fw-semibold d-flex align-items-center gap-2">
              <span className="rounded-circle d-inline-block" style={{ width: '8px', height: '8px', backgroundColor: '#f97316' }} />
              Note (Optional)
            </label>
            <textarea
              id="note"
              placeholder="Add a description..."
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              rows={4}
              className="form-control"
              style={{ borderWidth: '2px', resize: 'none' }}
            />
          </div>

          {/* Buttons */}
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