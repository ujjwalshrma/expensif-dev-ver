import Card from "../UI/Card/Card"

const Expense = ({ budget, removeExpense }) => {
    return (
        budget.expenses.map((expense) => (
            <Card>
                <div key={expense.eId}>
                    <p>expense name: {expense.eName}</p>
                    <p>expense amount: {expense.eAmount}</p>
                    <button onClick={() => { removeExpense(expense.bId, expense.eId) }} >remove expense</button>
                </div>
            </Card>
        ))
    )
}

export default Expense 
