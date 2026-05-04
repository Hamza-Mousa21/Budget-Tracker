export function exportToCSV(expenses) {
  const header = ['Date', 'Description', 'Category', 'Amount']

  const rows = expenses.map((e) => [
    e.date,
    `"${(e.note || e.description || '').replace(/"/g, '""')}"`,
    e.category,
    Number(e.amount || 0).toFixed(2),
  ])

  const totalExpenses = expenses
    .reduce((sum, e) => sum + Number(e.amount || 0), 0)
    .toFixed(2)

  const lines = [
    header.join(','),
    ...rows.map((r) => r.join(',')),
    '',
    `Total Expenses,,,${totalExpenses}`,
  ]

  return lines.join('\n')
}