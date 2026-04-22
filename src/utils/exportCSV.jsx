

export function exportToCSV(expenses, monthlyIncomes) {
  const header = ['Date', 'Description', 'Category', 'Amount']

  const rows = expenses.map(e => [
    e.date,
    `"${e.description.replace(/"/g, '""')}"`,
    e.category,
    e.amount.toFixed(2),
  ])

  const totalExpenses = expenses
    .reduce((sum, e) => sum + e.amount, 0)
    .toFixed(2)

  const lines = [
    header.join(','),
    ...rows.map(r => r.join(',')),
    '',
    `Total Expenses,,,${totalExpenses}`,
  ]

  return lines.join('\n')
}