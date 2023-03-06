import { useContext, useState } from "react"
import { budgetContext } from "./store/budget-context"

import { v4 as uuidv4 } from 'uuid';

function App() {
    const budgetCtx = useContext(budgetContext)
    const budgets = budgetCtx.budgets

    const [budgetName, setBudgetName] = useState('')
    const [budgetAmount, setBudgetAmount] = useState(0)

    const [expenseName, setExpenseName] = useState('')
    const [expenseAmount, setExpenseAmount] = useState(0)

    const onBudgetNameChangeHandler = (event) => {
        setBudgetName(event.target.value)
    }

    const onBudgetAmountChangeHandler = (event) => {
        setBudgetAmount(event.target.value)
    }


    const onExpenseNameChangeHandler = (event) => {
        setExpenseName(event.target.value)
    }

    const onExpenseAmountChangeHandler = (event) => {
        setExpenseAmount(event.target.value)
    }

    function onBudgetSubmit(event) {
        event.preventDefault()

        if (budgetName.trim() !== '' && budgetAmount > 0) {
            budgetCtx.addBudget({ bName: budgetName, bAmount: budgetAmount, bId: uuidv4() })
        }

        setBudgetAmount('')
        setBudgetName('')

        return

    }

    function onExpenseSubmit(event) {
        event.preventDefault()

        const budgetId = event.target.id
        console.log(budgetId)
        budgetCtx.addExpense({ eAmount: expenseAmount, eName: expenseName, eId: uuidv4(), bId: budgetId })
    }


    return (
        <main>
            <form onSubmit={onBudgetSubmit}>
                <input type="text" name="budget name" onChange={onBudgetNameChangeHandler} value={budgetName} placeholder="enter budget name" />
                <input onChange={onBudgetAmountChangeHandler} value={budgetAmount} type="number" name="budget amount" placeholder="enter budget amount" />
                <button type="submit">add budget</button>
            </form>
            <form onSubmit={onExpenseSubmit} id={budgets.length > 0 ? budgets[0].bId : ''}>
                <input type="text" name="expense name" onChange={onExpenseNameChangeHandler} value={expenseName} placeholder="enter expense name" />
                <input onChange={onExpenseAmountChangeHandler} value={expenseAmount} type="number" name="expense amount" placeholder="enter expense amount" />
                <button type="submit">add expense</button>
            </form>
            <div>
                {
                    budgets.map(budget => {
                        return (
                            <div key={budget.bId}>
                                <p>bName: {budget.bName}</p>
                                <p>bAmount: {budget.bAmount}</p>
                                <p>bId: {budget.bId}</p>
                                {budget.expenses.map((expense) => (
                                    <div key={expense.eId} style={{margin: '10px', background: 'black', padding: '10px'}}>
                                        <p>bId: {expense.bId}</p>
                                        <p>eId: {expense.eId}</p>
                                        <p>eName: {expense.eName}</p>
                                        <p>eAmount: {expense.eAmount}</p>
                                    </div>
                                ))}
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}

export default App
