import styles from './ProgressBar.module.css'

const ProgressBar = ({ budget }) => {

    let spentAmount = 0
    let remainingAmount = budget.bAmount
    let oldPercentage = 0;

    budget.expenses.map(exp => {
        return spentAmount += exp.eAmount
    })

    let percentage = 0

    if (percentage <= 0) {
        percentage = (spentAmount / remainingAmount) * 100
    }

    if (percentage >= 100) {
        oldPercentage = percentage
        percentage = 100
    }

    const innerProgressBarClass = `${styles.inner__bar} ${oldPercentage > 100 ? styles.exceeded : ''}`


    return (
        <>
            {oldPercentage > 100 &&
                <p className={styles.error}>You've Exceeded the budget!</p>
            }
            <div className={styles.outer__bar}>
                <div className={innerProgressBarClass} style={{ width: `${percentage}%` }} />
            </div>
            <div className={styles.progress__amount}>
                <p className='small'>Rs. {spentAmount} spent</p>
                <p className='small'>Rs. {remainingAmount - spentAmount} Remaining</p>
            </div>
        </>
    )
}

export default ProgressBar
