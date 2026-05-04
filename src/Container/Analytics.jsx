import React, { useState, useMemo, useEffect } from 'react'
import Header from '../Component/header'
import SidebarBody from '../Component/SidbarBody'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { exportToCSV } from '../utils/exportCSV'
import { CATEGORY_COLORS } from '../utils/data'

const API_URL = 'http://localhost:5000'

const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

function getCategoryColor(category) {
  return CATEGORY_COLORS[category?.toLowerCase()] || '#64748b'
}

function EmptyChart() {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-muted" style={{ height: 300 }}>
      <p className="mb-0" style={{ fontSize: '1.05rem', color: '#64748b' }}>
        No data for selected period
      </p>
    </div>
  )
}

function SectionTitle({ title, accent = '#8b5cf6' }) {
  return (
    <div className="d-flex align-items-center fw-bold" style={{ fontSize: '1.05rem', color: '#111827' }}>
      <span
        style={{
          width: '4px',
          height: '26px',
          background: accent,
          borderRadius: '999px',
          display: 'inline-block',
          marginRight: '12px',
        }}
      />
      {title}
    </div>
  )
}

function GlassCard({ children, topGradient }) {
  return (
    <div
      className="h-100"
      style={{
        background: 'var(--card-bg)',
        borderRadius: '24px',
        boxShadow: '0 8px 24px rgba(15, 23, 42, 0.08)',
        overflow: 'hidden',
        border: '1px solid rgba(226, 232, 240, 0.8)',
      }}
    >
      <div style={{ height: '4px', background: topGradient }} />
      {children}
    </div>
  )
}

export default function Analytics() {
  const now = new Date()

  const [selectedMonth, setSelectedMonth] = useState(now.getMonth())
  const [selectedYear, setSelectedYear] = useState(now.getFullYear())
  const [selectedDate, setSelectedDate] = useState(now.toISOString().split('T')[0])
  const [filterType, setFilterType] = useState('month')

  const [expenses, setExpenses] = useState([])
  const [monthlyIncomes, setMonthlyIncomes] = useState([])
  const [isSmall, setIsSmall] = useState(window.innerWidth < 785)

  const years = Array.from({ length: 5 }, (_, i) => now.getFullYear() - i)

  useEffect(() => {
    loadData()
  }, [])

  useEffect(() => {
    const handleSmallScreen = () => {
      setIsSmall(window.innerWidth < 785)
    }

    window.addEventListener('resize', handleSmallScreen)
    return () => window.removeEventListener('resize', handleSmallScreen)
  }, [])

  const normalizeTransaction = (transaction) => {
    return {
      id: transaction.id,
      amount: Number(transaction.amount || 0),
      category: transaction.category?.name || 'Other',
      date: transaction.transactionDate
        ? transaction.transactionDate.split('T')[0]
        : transaction.date || '',
      note: transaction.description || '',
      raw: transaction,
    }
  }

  const loadData = async () => {
    try {
      const token = localStorage.getItem('token')

      if (!token) {
        setExpenses([])
        setMonthlyIncomes([])
        return
      }

      const transactionsResponse = await fetch(`${API_URL}/transactions`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const incomesResponse = await fetch(`${API_URL}/monthly-incomes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!transactionsResponse.ok) {
        throw new Error('Failed to load transactions')
      }

      const transactionsData = await transactionsResponse.json()
      const normalized = transactionsData.map(normalizeTransaction)

      setExpenses(normalized)

      if (incomesResponse.ok) {
        const incomesData = await incomesResponse.json()
        setMonthlyIncomes(incomesData)
      } else {
        setMonthlyIncomes([])
      }
    } catch (error) {
      console.error('Error loading analytics data:', error)
      setExpenses([])
      setMonthlyIncomes([])
    }
  }

  const filteredExpenses = useMemo(() => {
    return expenses.filter((e) => {
      const d = new Date(e.date)

      if (filterType === 'date') {
        return e.date === selectedDate
      }

      return d.getMonth() === selectedMonth && d.getFullYear() === selectedYear
    })
  }, [expenses, selectedMonth, selectedYear, selectedDate, filterType])

  const categoryData = useMemo(() => {
    const map = {}

    filteredExpenses.forEach((e) => {
      const category = e.category || 'Other'
      map[category] = (map[category] || 0) + Number(e.amount || 0)
    })

    return Object.entries(map).map(([category, amount]) => ({
      category,
      amount: parseFloat(amount.toFixed(2)),
    }))
  }, [filteredExpenses])

  const trendData = useMemo(() => {
    const result = []

    for (let i = 5; i >= 0; i--) {
      const baseDate = filterType === 'date'
        ? new Date(selectedDate)
        : new Date(selectedYear, selectedMonth, 1)

      const d = new Date(baseDate.getFullYear(), baseDate.getMonth() - i, 1)
      const mo = d.getMonth()
      const yr = d.getFullYear()

      const total = expenses
        .filter((e) => {
          const ed = new Date(e.date)
          return ed.getMonth() === mo && ed.getFullYear() === yr
        })
        .reduce((sum, e) => sum + Number(e.amount || 0), 0)

      result.push({
        month: d.toLocaleDateString('en-US', {
          month: 'short',
          year: '2-digit',
        }),
        expenses: parseFloat(total.toFixed(2)),
      })
    }

    return result
  }, [expenses, selectedMonth, selectedYear, selectedDate, filterType])

  const income = useMemo(() => {
    const targetDate = filterType === 'date'
      ? new Date(selectedDate)
      : new Date(selectedYear, selectedMonth, 1)

    const monthNumber = targetDate.getMonth() + 1
    const yearNumber = targetDate.getFullYear()

    const incomeRecord = monthlyIncomes.find((item) => {
      return Number(item.month) === monthNumber && Number(item.year) === yearNumber
    })

    return incomeRecord ? Number(incomeRecord.amount || 0) : 0
  }, [monthlyIncomes, selectedMonth, selectedYear, selectedDate, filterType])

  const totalExp = filteredExpenses.reduce((sum, e) => sum + Number(e.amount || 0), 0)
  const balance = income - totalExp

  function handleExport() {
    const csv = exportToCSV(filteredExpenses)
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')

    a.href = url
    a.download = filterType === 'date'
      ? `expenses-${selectedDate}.csv`
      : `expenses-${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}.csv`

    a.click()
    URL.revokeObjectURL(url)
  }

  const summaryStats = [
    {
      label: 'Monthly Income',
      value: `$${income.toFixed(2)}`,
      cls: '#7c3aed',
      border: '#c4b5fd',
      bg: '#f5f3ff',
    },
    {
      label: 'Total Expenses',
      value: `$${totalExp.toFixed(2)}`,
      cls: '#e11d74',
      border: '#f9a8d4',
      bg: '#fdf2f8',
    },
    {
      label: 'Transactions',
      value: filteredExpenses.length,
      cls: '#ea580c',
      border: '#fdba74',
      bg: '#fff7ed',
    },
    {
      label: 'Remaining Balance',
      value: `$${balance.toFixed(2)}`,
      cls: balance >= 0 ? '#10b981' : '#ef4444',
      border: balance >= 0 ? '#86efac' : '#fca5a5',
      bg: balance >= 0 ? '#ecfdf5' : '#fef2f2',
    },
  ]

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
        <div className="flex-grow-1">
          <main>
            <div className="d-flex">
              <div className="col-md-3 col-lg-3">
                {!isSmall && <SidebarBody />}
              </div>

              <div className="col-12 col-md-9 col-lg-9 p-4 p-lg-4">
                <div className="py-4 px-1 px-md-2" style={{ backgroundColor: 'var(--bg-primary)', minHeight: '100vh' }}>
                  <div className="d-flex flex-column flex-lg-row justify-content-between align-items-start gap-3 mb-4">
                    <div>
                      <h1
                        className="fw-bold mb-2"
                        style={{
                          fontSize: '3rem',
                          lineHeight: 1.05,
                          background: 'linear-gradient(90deg, #ec4899 0%, #ef4444 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                        }}
                      >
                        Analytics & Reports
                      </h1>

                      <div className="d-flex align-items-center text-muted">
                        <span
                          style={{
                            width: '9px',
                            height: '9px',
                            borderRadius: '50%',
                            background: '#ec4899',
                            display: 'inline-block',
                            marginRight: '10px',
                          }}
                        />
                        <span style={{ fontSize: '1.15rem', color: '#64748b' }}>
                          Detailed insights into your spending patterns
                        </span>
                      </div>
                    </div>

                    <button
                      className="btn border-0 d-flex align-items-center gap-2"
                      onClick={handleExport}
                      style={{
                        background: 'linear-gradient(90deg, #8b5cf6 0%, #9333ea 100%)',
                        color: '#fff',
                        borderRadius: '14px',
                        padding: '12px 20px',
                        fontWeight: 700,
                        boxShadow: '0 10px 20px rgba(139, 92, 246, 0.25)',
                      }}
                    >
                      <span style={{ fontSize: '1rem' }}>↓</span>
                      Export CSV
                    </button>
                  </div>

                  <div className="d-flex flex-wrap gap-3 mb-4">
                    <select
                      className="form-select border-0 shadow-sm"
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      style={{
                        width: '170px',
                        height: '50px',
                        borderRadius: '14px',
                        background: '#ffffff',
                        color: '#111827',
                        fontWeight: 600,
                      }}
                    >
                      <option value="month">Month / Year</option>
                      <option value="date">Specific Date</option>
                    </select>

                    {filterType === 'month' ? (
                      <>
                        <select
                          className="form-select border-0 shadow-sm"
                          value={selectedMonth}
                          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                          style={{
                            width: '160px',
                            height: '50px',
                            borderRadius: '14px',
                            background: '#ffffff',
                            color: '#111827',
                            fontWeight: 600,
                          }}
                        >
                          {MONTHS.map((m, i) => (
                            <option key={m} value={i}>
                              {m}
                            </option>
                          ))}
                        </select>

                        <select
                          className="form-select border-0 shadow-sm"
                          value={selectedYear}
                          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                          style={{
                            width: '120px',
                            height: '50px',
                            borderRadius: '14px',
                            background: '#ffffff',
                            color: '#111827',
                            fontWeight: 600,
                          }}
                        >
                          {years.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </select>
                      </>
                    ) : (
                      <input
                        type="date"
                        className="form-control border-0 shadow-sm"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        style={{
                          width: '180px',
                          height: '50px',
                          borderRadius: '14px',
                          background: '#ffffff',
                          color: '#111827',
                          fontWeight: 600,
                        }}
                      />
                    )}
                  </div>

                  <div className="row g-4 mb-4">
                    <div className="col-lg-6">
                      <GlassCard topGradient="linear-gradient(90deg, #8b5cf6 0%, #ec4899 100%)">
                        <div className="px-4 py-4" style={{ background: 'var(--card-bg)', minHeight: '100%' }}>
                          <div className="px-4 py-4" style={{ background: 'var(--card-bg)', borderRadius: '22px 22px 0 0' }}>
                            <SectionTitle title="Expenses by Category" accent="#8b5cf6" />
                          </div>

                          <div className="px-3 px-md-4 pb-4">
                            {categoryData.length > 0 ? (
                              <ResponsiveContainer width="100%" height={320}>
                                <BarChart data={categoryData} margin={{ top: 10, right: 10, left: 0, bottom: 10 }}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                  <XAxis dataKey="category" tick={{ fontSize: 11, fill: '#64748b' }} />
                                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                                  <Tooltip formatter={(v) => [`$${Number(v).toFixed(2)}`, 'Amount']} />
                                  <Bar dataKey="amount" radius={[10, 10, 0, 0]} name="Amount ($)">
                                    {categoryData.map((entry) => (
                                      <Cell key={entry.category} fill={getCategoryColor(entry.category)} />
                                    ))}
                                  </Bar>
                                </BarChart>
                              </ResponsiveContainer>
                            ) : (
                              <EmptyChart />
                            )}
                          </div>
                        </div>
                      </GlassCard>
                    </div>

                    <div className="col-lg-6">
                      <GlassCard topGradient="linear-gradient(90deg, #ec4899 0%, #f97316 100%)">
                        <div className="px-4 py-4" style={{ background: 'var(--card-bg)', minHeight: '100%' }}>
                          <div className="px-4 py-4" style={{ background: 'var(--card-bg)', borderRadius: '22px 22px 0 0' }}>
                            <SectionTitle title="6-Month Trend" accent="#ec4899" />
                          </div>

                          <div className="px-3 px-md-4 pb-4">
                            {trendData.length > 0 ? (
                              <ResponsiveContainer width="100%" height={320}>
                                <LineChart data={trendData}>
                                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                                  <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748b' }} />
                                  <YAxis tick={{ fontSize: 11, fill: '#64748b' }} />
                                  <Tooltip formatter={(v) => [`$${Number(v).toFixed(2)}`, 'Expenses ($)']} />
                                  <Legend />
                                  <Line
                                    type="monotone"
                                    dataKey="expenses"
                                    stroke="#ec4899"
                                    strokeWidth={4}
                                    dot={{ r: 5, fill: '#ec4899' }}
                                    activeDot={{ r: 7 }}
                                    name="Expenses ($)"
                                  />
                                </LineChart>
                              </ResponsiveContainer>
                            ) : (
                              <EmptyChart />
                            )}
                          </div>
                        </div>
                      </GlassCard>
                    </div>
                  </div>

                  <div className="mb-4">
                    <GlassCard topGradient="linear-gradient(90deg, #10b981 0%, #06b6d4 100%)">
                      <div className="px-4 py-4">
                        <div className="px-3 py-4 mb-4" style={{ background: '#edf7f3', borderRadius: '18px' }}>
                          <SectionTitle title="Summary Statistics" accent="#10b981" />
                        </div>

                        <div className="row g-4 px-1 pb-2">
                          {summaryStats.map((s) => (
                            <div key={s.label} className="col-12 col-sm-6 col-xl-3">
                              <div
                                className="h-100"
                                style={{
                                  border: `2px solid ${s.border}`,
                                  borderRadius: '20px',
                                  padding: '22px',
                                  background: s.bg,
                                  minHeight: '130px',
                                  display: 'flex',
                                  flexDirection: 'column',
                                  justifyContent: 'center',
                                }}
                              >
                                <div style={{ color: '#64748b', fontSize: '1.15rem', fontWeight: 600 }}>
                                  {s.label}
                                </div>
                                <div style={{ color: s.cls, fontSize: '2.15rem', fontWeight: 800, lineHeight: 1.1 }}>
                                  {s.value}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </GlassCard>
                  </div>

                  <div className="mb-4">
                    <GlassCard topGradient="linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)">
                      <div className="px-4 py-4">
                        <div className="px-3 py-4 mb-4" style={{ background: '#faf5ff', borderRadius: '18px' }}>
                          <SectionTitle title="Category Distribution" accent="#a855f7" />
                        </div>

                        <div className="px-2 pb-3">
                          {categoryData.length > 0 ? (
                            <ResponsiveContainer width="100%" height={360}>
                              <PieChart>
                                <Pie
                                  data={categoryData}
                                  dataKey="amount"
                                  nameKey="category"
                                  cx="50%"
                                  cy="50%"
                                  innerRadius={70}
                                  outerRadius={120}
                                  paddingAngle={4}
                                  label={({ category, percent }) =>
                                    `${category} ${(percent * 100).toFixed(0)}%`
                                  }
                                >
                                  {categoryData.map((entry) => (
                                    <Cell
                                      key={entry.category}
                                      fill={getCategoryColor(entry.category)}
                                      stroke="#ffffff"
                                      strokeWidth={3}
                                    />
                                  ))}
                                </Pie>

                                <Tooltip formatter={(v) => `$${Number(v).toFixed(2)}`} />
                                <Legend />
                              </PieChart>
                            </ResponsiveContainer>
                          ) : (
                            <EmptyChart />
                          )}
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  )
}