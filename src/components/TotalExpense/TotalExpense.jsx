const TotalExpense = ({ budgets }) => {
    let totalExpense = 0

    budgets.forEach(budget => {
        budget.expenses.forEach(expense => {
            totalExpense = totalExpense + expense.eAmount
            return totalExpense
        })
    })


    return (
        <div>
            <h1>Total Expense: {totalExpense}</h1>
        </div>
    )
}

export default TotalExpense
