import styles from './ProgressBar.module.css'

const ProgressBar = ({ budget }) => {

    let spentAmount = 0
    let remainingAmount = budget.bAmount

    budget.expenses.map(exp => {
        return spentAmount += exp.eAmount
    })

    let percentage = 0

    if (percentage <= 0) {
        percentage = (spentAmount / remainingAmount) * 100
    }

    if (percentage >= 100) {
        percentage = 100
    }


    return (
        <>
            <div className={styles.outer__bar}>
                <div className={styles.inner__bar} style={{ width: `${percentage}%` }} />
            </div>
            <div className={styles.progress__amount}>
                <p className='small'>Rs. {spentAmount} spent</p>
                <p className='small'>Rs. {remainingAmount - spentAmount} Remaining</p>
            </div>
        </>
    )
}

export default ProgressBar
