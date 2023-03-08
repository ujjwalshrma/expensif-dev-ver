import Expense from "../Expenses/Expense"


const Budget = ({ budgets, removeBudget, removeExpense }) => {

    return (budgets.map(budget => {
        return (
            <div key={budget.bId}>
                <p>budget name: {budget.bName}</p>
                <p>budget amount: {budget.bAmount}</p>
                {budgets && (
                    <Expense budget={budget} removeExpense={removeExpense} />
                )}
                <button onClick={() => { removeBudget(budget.bId) }} >remove {budget.bName}</button>
            </div>
        )
    })
    )
}

export default Budget
