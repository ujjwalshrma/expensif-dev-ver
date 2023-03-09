import styles from './Budget.module.css'

import Expense from "../Expenses/Expense"
import Card from "../UI/Card/Card"
import ProgressBar from '../UI/ProgressBar/ProgressBar'


const Budget = ({ budgets, removeBudget, removeExpense }) => {

    return (budgets.map(budget => {
        return (
            <div key={budget.bId}>
                <Card color='t' className={styles.budget__card}>
                    <div className={styles.budget__heading__wrapper}>
                        <h1>{budget.bName}</h1>
                        <h1>Rs. {budget.bAmount}</h1>
                    </div>
                    <ProgressBar budget={budget} />
                    {budgets && (
                        <Expense budget={budget} removeExpense={removeExpense} />
                    )}
                    <button onClick={() => { removeBudget(budget.bId) }} >Remove {budget.bName}</button>
                </Card>
            </div>
        )
    })
    )
}

export default Budget
