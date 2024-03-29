import { useContext, useState } from 'react'
import { budgetContext } from './store/budget-context'

import TotalExpense from './components/TotalExpense/TotalExpense'

import UserName from './components/UserName/UserName'

//budgets components
import BudgetForm from './components/Budgets/BudgetForm'
import Budget from './components/Budgets/Budget'

//expenses components
import ExpensesForm from './components/Expenses/ExpensesForm'

//sort component
import SortButton from './components/Sort/SortButton'

//auto animate
import { useAutoAnimate } from '@formkit/auto-animate/react'

import { MONTHS } from './components/lib/date'

function App() {
	const [isEnteredNameValid, setIsEnteredNameValid] = useState(false)
	const [userName, setUserName] = useState('')

	const initialMonth = MONTHS[new Date().getMonth()]

	const [curMonth, getCurMonth] = useState(initialMonth)

	const budgetCtx = useContext(budgetContext)
	const budgets = budgetCtx.budgets

	const [expenseFormRef] = useAutoAnimate()

	const checkEnteredName = (name) => {
		if (name.trim('') !== '') {
			setUserName(name)
			setIsEnteredNameValid(true)
			localStorage.setItem('name', JSON.stringify(name))
		} else {
			setIsEnteredNameValid(false)
		}
	}

	const onDeleteUserHandler = () => {
		setUserName('')
		setIsEnteredNameValid(false)
		localStorage.clear()
	}

	if (!isEnteredNameValid) {
		return <UserName userName={checkEnteredName} />
	}

	return (
		<>
			<h1 className='user-name'>Hi👋, {userName}</h1>
			<button className='delete-btn' onClick={onDeleteUserHandler}>
				Delete User
			</button>
			<TotalExpense curMonth={curMonth} budgets={budgets} />
			<SortButton initialMonth={initialMonth} getCurMonth={getCurMonth} />
			<BudgetForm addBudget={budgetCtx.addBudget} />
			<div ref={expenseFormRef}>
				{budgets.length > 0 && (
					<ExpensesForm
						addExpense={budgetCtx.addExpense}
						budgets={budgets}
					/>
				)}
			</div>
			<Budget
				curMonth={curMonth}
				budgets={budgets}
				removeBudget={budgetCtx.removeBudget}
				removeExpense={budgetCtx.removeExpense}
			/>
		</>
	)
}

export default App
