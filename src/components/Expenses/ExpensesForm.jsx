import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const ExpensesForm = ({ addExpense, budgets }) => {
    const [expenseName, setExpenseName] = useState('')
    const [expenseAmount, setExpenseAmount] = useState(0)

    const [selectedBudget, setSelectedBudget] = useState('')

    const onExpenseNameChangeHandler = (event) => {
        setExpenseName(event.target.value)
    }

    const onExpenseAmountChangeHandler = (event) => {
        setExpenseAmount(event.target.value)
    }

    function onExpenseSubmit(event) {
        event.preventDefault()

        const budgetId = selectedBudget ? selectedBudget : budgets[0].bId
        addExpense({ eAmount: +expenseAmount, eName: expenseName, eId: uuidv4(), bId: budgetId })

        setExpenseName('')
        setExpenseAmount(0)
    }

    return (
        <div>
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
        </div>
    )
}

export default ExpensesForm
