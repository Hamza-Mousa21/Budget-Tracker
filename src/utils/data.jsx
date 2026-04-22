
const today = new Date()
const y = today.getFullYear()
const m = today.getMonth() // 0-based

// Helper: safe month key (handles year rollover)
function prevKey(monthsBack) {
  const d = new Date(y, m - monthsBack, 1)
  return `${d.getFullYear()}-${d.getMonth()}`
}

// Helper: date string for current month
function thisMonth(day) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
}

export const initialBudgetData = {
  monthlyIncomes: {
    [prevKey(0)]: 4500,
    [prevKey(1)]: 4200,
    [prevKey(2)]: 4300,
    [prevKey(3)]: 4100,
    [prevKey(4)]: 4400,
    [prevKey(5)]: 4000,
  },
  expenses: [
    { id: 1,  description: 'Rent',             amount: 1200, category: 'housing',       date: thisMonth(1)  },
    { id: 2,  description: 'Groceries',         amount: 320,  category: 'food',          date: thisMonth(5)  },
    { id: 3,  description: 'Electricity Bill',  amount: 85,   category: 'utilities',     date: thisMonth(7)  },
    { id: 4,  description: 'Bus Pass',          amount: 60,   category: 'transport',     date: thisMonth(10) },
    { id: 5,  description: 'Gym Membership',    amount: 45,   category: 'health',        date: thisMonth(12) },
    { id: 6,  description: 'Netflix',           amount: 15,   category: 'entertainment', date: thisMonth(14) },
    { id: 7,  description: 'New Shoes',         amount: 110,  category: 'shopping',      date: thisMonth(17) },
    { id: 8,  description: 'Dentist Visit',     amount: 75,   category: 'health',        date: thisMonth(18) },
    { id: 9,  description: 'Restaurant Dinner', amount: 55,   category: 'food',          date: thisMonth(20) },
    { id: 10, description: 'Internet Bill',     amount: 40,   category: 'utilities',     date: thisMonth(22) },
  ],
}

export const CATEGORIES = [
  'food',
  'transport',
  'housing',
  'utilities',
  'health',
  'entertainment',
  'shopping',
  'other',
]

export const CATEGORY_COLORS = {
  food:          '#eab308',
  transport:     '#3b82f6',
  housing:       '#ec4899',
  utilities:     '#10b981',
  health:        '#ef4444',
  entertainment: '#8b5cf6',
  shopping:      '#f97316',
  other:         '#64748b',
}