import styles from './Expense.module.css'

import Card from '../UI/Card/Card'

import deleteIcon from '../../../public/delete-icon.svg'

import { useAutoAnimate } from '@formkit/auto-animate/react'

const Expense = ({ budget, removeExpense }) => {
	const [expensesRef] = useAutoAnimate()

	return (
		<div className={styles.expenses__wrapper} ref={expensesRef}>
			{budget.expenses.map((expense) => (
				<div className={styles.expense} key={expense.eId}>
					<Card color='p' className={styles.expense__card}>
						<div className={styles.expense__inner__card}>
							<p>{expense.eName}</p>
							<p>-</p>
							<p>Rs. {expense.eAmount}</p>
						</div>
						<div className={styles.remove__wrapper}>
							<p>{expense.eDate}</p>
							<button
								className={styles.delete__icon}
								onClick={() => {
									removeExpense(expense.bId, expense.eId)
								}}
							>
								<img src={deleteIcon} alt='Delete Expense' />
							</button>
						</div>
					</Card>
				</div>
			))}
		</div>
	)
}

export default Expense
