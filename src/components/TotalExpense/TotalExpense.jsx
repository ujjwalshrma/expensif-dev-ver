import Card from "../UI/Card/Card"

const TotalExpense = ({ budgets }) => {
    let totalExpense = 0

    budgets.forEach(budget => {
        budget.expenses.forEach(expense => {
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
