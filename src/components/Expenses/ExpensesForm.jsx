import styles from './ExpensesForm.module.css'

import { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

import Card from '../UI/Card/Card'

import useDate from '../../hooks/useDate'

const ExpensesForm = ({ addExpense, budgets }) => {
	const eDate = useDate()

	console.log(eDate)

	const [expenseName, setExpenseName] = useState('')
	const [expenseAmount, setExpenseAmount] = useState('')

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
		addExpense({
			eAmount: +expenseAmount,
			eName: expenseName,
			eId: uuidv4(),
			bId: budgetId,
			eDate: eDate,
		})

		setExpenseName('')
		setExpenseAmount('')
	}

	return (
		<Card color='r' className={styles.expense__card}>
			<h1 className={styles.expense__form__heading}>
				{budgets.length > 1
					? `Add Expenses`
					: `Add Expense To ${budgets[0].bName}`}
			</h1>
			<form onSubmit={onExpenseSubmit} className={styles.expense__form}>
				<input
					type='text'
					name='expense name'
					onChange={onExpenseNameChangeHandler}
					value={expenseName}
					placeholder='Enter expense name'
				/>
				<input
					onChange={onExpenseAmountChangeHandler}
					value={expenseAmount}
					type='number'
					name='expense amount'
					placeholder='Enter expense amount'
				/>
				{budgets.length > 1 && (
					<select
						value={selectedBudget}
						onChange={(e) => setSelectedBudget(e.target.value)}
					>
						{budgets.map((budget) => {
							return (
								<option
									className={styles.budget__option}
									key={budget.bId}
									value={budget.bId}
								>
									{budget.bName}
								</option>
							)
						})}
					</select>
				)}
				<button type='submit'>Add Expense</button>
			</form>
		</Card>
	)
}

export default ExpensesForm
