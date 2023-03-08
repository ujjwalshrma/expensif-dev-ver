import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

const BudgetForm = ({ addBudget }) => {

    const [budgetName, setBudgetName] = useState('')
    const [budgetAmount, setBudgetAmount] = useState(0)

    const onBudgetNameChangeHandler = (event) => {
        setBudgetName(event.target.value)
    }

    const onBudgetAmountChangeHandler = (event) => {
        setBudgetAmount(event.target.value)
    }

    function onBudgetSubmit(event) {
        event.preventDefault()

        if (budgetName.trim() !== '' && budgetAmount > 0) {
            addBudget({ bName: budgetName, bAmount: +budgetAmount, bId: uuidv4() })
        }

        setBudgetAmount('')
        setBudgetName('')

        return
    }

    return (
        <form onSubmit={onBudgetSubmit}>
            <input type="text" name="budget name" onChange={onBudgetNameChangeHandler} value={budgetName} placeholder="enter budget name" />
            <input onChange={onBudgetAmountChangeHandler} value={budgetAmount} type="number" name="budget amount" placeholder="enter budget amount" />
            <button type="submit">add budget</button>
        </form>
    )
}

export default BudgetForm
