import Card from '../UI/Card/Card'

const TotalExpense = ({ budgets, curMonth }) => {
	let totalExpense = 0

	const newBudgets = budgets.filter((budget) => {
		return budget.bDate.split(' ')[1] === curMonth
	})

	newBudgets.forEach((budget) => {
		budget.expenses.forEach((expense) => {
			totalExpense = totalExpense + expense.eAmount
			return totalExpense
		})
	})

	return (
		<Card flex='flex-h'>
			<h1>Total Expense</h1>
			<h1>Rs. {totalExpense}</h1>
		</Card>
	)
}

export default TotalExpense
