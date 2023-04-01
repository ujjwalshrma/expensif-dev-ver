import styles from './Budget.module.css'

import Expense from '../Expenses/Expense'
import Card from '../UI/Card/Card'
import ProgressBar from '../UI/ProgressBar/ProgressBar'

import { useAutoAnimate } from '@formkit/auto-animate/react'

const Budget = ({ budgets, removeBudget, removeExpense }) => {
	const [budgetsRef] = useAutoAnimate()

	return (
		<div ref={budgetsRef}>
			{budgets.map((budget) => {
				return (
					<div key={budget.bId}>
						<Card color='t' className={styles.budget__card}>
							<div className={styles.budget__heading__wrapper}>
								<h1>{budget.bName}</h1>
								<div className={styles.date__wrapper}>
									<p className='small'>{budget.bDate}</p>
								</div>
								<h1>Rs. {budget.bAmount}</h1>
							</div>
							<ProgressBar budget={budget} />
							{budgets && (
								<Expense
									budget={budget}
									removeExpense={removeExpense}
								/>
							)}
							<button
								className={styles.remove__budget__btn}
								onClick={() => {
									removeBudget(budget.bId)
								}}
							>
								Remove {budget.bName} Budget
							</button>
						</Card>
					</div>
				)
			})}
		</div>
	)
}

export default Budget
