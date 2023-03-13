import styles from './BudgetForm.module.css'
import { useState } from "react"
import { v4 as uuidv4 } from 'uuid';

import Card from "../UI/Card/Card";

import plus from '../../../public/plus.svg'

const BudgetForm = ({ addBudget }) => {

    const [budgetName, setBudgetName] = useState('')
    const [budgetAmount, setBudgetAmount] = useState('')

    const [accordian, setAccordian] = useState(false)

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
            setAccordian(prevAcc => !prevAcc)
        }

        setBudgetAmount('')
        setBudgetName('')

        return
    }

    const onAccordianHandler = () => {
        setAccordian(prevAcc => !prevAcc)
    }


    const plugIconClass = `${styles.plus} ${accordian ? styles.open : ''}`
    const accordianClass = `${styles.accordian} ${accordian ? styles.open : ''}`

    return (
        <div className={accordianClass}>
            <div onClick={onAccordianHandler} className={styles.accordian__header}>
                <h1>Create Budget</h1>
                <img className={plugIconClass} src={plus} alt="Plus Icon" />
            </div>
            <Card color='g' className={styles.budget__card}>
                <h1 className={styles.budget__form__heading}>Create Budget</h1>
                <form onSubmit={onBudgetSubmit} className={styles.budget__form}>
                    <input type="text" name="budget name" onChange={onBudgetNameChangeHandler} value={budgetName} placeholder="Enter budget Name" />
                    <input onChange={onBudgetAmountChangeHandler} min='0' value={budgetAmount} type="number" name="budget amount" placeholder="Enter budget amount" />
                    <button type="submit">Add Budget</button>
                </form>
            </Card>
        </div>
    )
}

export default BudgetForm
