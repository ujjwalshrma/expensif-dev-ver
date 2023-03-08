const Expnese = ({ budget, removeExpense }) => {
    return (
        budget.expenses.map((expense) => (
            <div key={expense.eId} style={{ margin: '10px', background: 'black', padding: '10px' }}>
                <p>expense name: {expense.eName}</p>
                <p>expense amount: {expense.eAmount}</p>
                <button onClick={() => { removeExpense(expense.bId, expense.eId) }} >remove expense</button>
            </div>
        ))
    )
}

export default Expnese
