

export function filterExpensesByMonth(expenses, year, month) {
  return expenses.filter((expense) => {
    const date = new Date(expense.date);
    return date.getFullYear() === year && date.getMonth() === month;
  });
}

export function getExpensesByCategory(expenses) {
  return expenses.reduce((acc, expense) => {
    const category = expense.category || 'Other';
    acc[category] = (acc[category] || 0) + Number(expense.amount || 0);
    return acc;
  }, {});
}

export function getMonthlyIncome(monthlyIncomes, year, month) {
  const income = monthlyIncomes.find((item) => {
    const date = new Date(item.date);
    return date.getFullYear() === year && date.getMonth() === month;
  });

  return income ? Number(income.amount) : 0;
}

export function exportToCSV(filteredExpenses) {
  const headers = ['Date', 'Category', 'Amount'];

  const rows = filteredExpenses.map((expense) => [
    expense.date,
    expense.category,
    expense.amount,
  ]);

  return [headers, ...rows]
    .map((row) => row.join(','))
    .join('\n');
}