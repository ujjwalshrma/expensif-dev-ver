export const initialBudgetState = []

export const budgetReducer = (state, action) => {
	if (action.type === 'ADD_BUDGET') {
		const budgets = [
			...state,
			{
				bName: action.payload.bName,
				bAmount: action.payload.bAmount,
				bId: action.payload.bId,
				bDate: action.payload.bDate,
				expenses: [],
			},
		]

		localStorage.setItem('budgets', JSON.stringify(budgets))

		return budgets
	}

	if (action.type === 'ADD_EXPENSE') {
		const oldBudgetIndex = state.findIndex((budget) => {
			return budget.bId === action.payload.bId
		})

		const newExpenses = [
			{
				bId: action.payload.bId,
				eName: action.payload.eName,
				eAmount: action.payload.eAmount,
				eId: action.payload.eId,
			},
			...state[oldBudgetIndex].expenses,
		]

		const newBudget = {
			...state[oldBudgetIndex],
			expenses: newExpenses,
		}

		state[oldBudgetIndex] = newBudget

		return [...state]
	}

	if (action.type === 'REMOVE_BUDGET') {
		const budgetId = action.payload

		const newBudgets = state.filter((budget) => {
			return budget.bId !== budgetId
		})

		return newBudgets
	}

	if (action.type === 'REMOVE_EXPENSE') {
		const budgetIndex = state.findIndex((budget) => {
			return budget.bId === action.payload.bId
		})

		const budget = state[budgetIndex]

		const newBudget = {
			...budget,
			expenses: budget.expenses.filter((exp) => {
				return exp.eId !== action.payload.eId
			}),
		}

		state[budgetIndex] = newBudget

		return [...state]
	}

	return initialBudgetState
}
