import styles from './BudgetForm.module.css'
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

import Card from "../UI/Card/Card";

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
        <Card color='g' className={styles.budget__card}>
            <h1 className={styles.budget__form__heading}>Create Budget</h1>
            <form onSubmit={onBudgetSubmit} className={styles.budget__form}>
                <input type="text" name="budget name" onChange={onBudgetNameChangeHandler} value={budgetName} placeholder="Budget Name" />
                <input onChange={onBudgetAmountChangeHandler} min='0' value={budgetAmount} type="number" name="budget amount" placeholder="enter budget amount" />
                <button type="submit">Add Budget</button>
            </form>
        </Card>
    )
}

export default BudgetForm
