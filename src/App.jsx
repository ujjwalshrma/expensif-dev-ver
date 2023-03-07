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

    const [selectedBudget, setSelectedBudget] = useState('')

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

        const budgetId = selectedBudget ? selectedBudget : budgets[0].bId
        budgetCtx.addExpense({ eAmount: expenseAmount, eName: expenseName, eId: uuidv4(), bId: budgetId })

        setExpenseName('')
        setExpenseAmount(0)
    }

    function onRemoveBudgetHandler(event) {
        budgetCtx.removeBudget(event.target.id)
    }

    function removeExpense(bId, eId) {
        budgetCtx.removeExpense(bId, eId)
    }

    function clearLocalStorage() {
        localStorage.clear()
    }


    return (
        <main>
            <button onClick={clearLocalStorage}>clear local storage</button>
            <form onSubmit={onBudgetSubmit}>
                <input type="text" name="budget name" onChange={onBudgetNameChangeHandler} value={budgetName} placeholder="enter budget name" />
                <input onChange={onBudgetAmountChangeHandler} value={budgetAmount} type="number" name="budget amount" placeholder="enter budget amount" />
                <button type="submit">add budget</button>
            </form>
            {budgets.length > 0 && (
                <form onSubmit={onExpenseSubmit}>
                    <input type="text" name="expense name" onChange={onExpenseNameChangeHandler} value={expenseName} placeholder="enter expense name" />
                    <input onChange={onExpenseAmountChangeHandler} value={expenseAmount} type="number" name="expense amount" placeholder="enter expense amount" />
                    {budgets.length > 1 &&
                        <select value={selectedBudget} onChange={e => setSelectedBudget(e.target.value)}>
                            {
                                budgets.map(budget => {
                                    return <option key={budget.bId} value={budget.bId}>{budget.bName}</option>
                                })
                            }
                        </select>
                    }
                    <button type="submit">add expense</button>
                </form>
            )}
            <div>
                {
                    budgets.map(budget => {
                        return (
                            <div key={budget.bId}>
                                <p>budget name: {budget.bName}</p>
                                <p>budget amount: {budget.bAmount}</p>
                                {budgets && (
                                    budget.expenses.map((expense) => (
                                        <div key={expense.eId} style={{ margin: '10px', background: 'black', padding: '10px' }}>
                                            <p>expense name: {expense.eName}</p>
                                            <p>expense amount: {expense.eAmount}</p>
                                            <button onClick={() => { removeExpense(expense.bId, expense.eId) }} >remove expense</button>
                                        </div>
                                    ))
                                )}
                                <button onClick={onRemoveBudgetHandler} id={budget.bId}>remove {budget.bName}</button>
                            </div>
                        )
                    })
                }
            </div>
        </main>
    )
}

export default App
