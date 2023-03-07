import { createContext, useReducer, useEffect } from "react";

const initialBudgetState = []

const budgetReducer = (state, action) => {
    if (action.type === "ADD_BUDGET") {
        const budgets = [...state, {
            bName: action.payload.bName,
            bAmount: action.payload.bAmount,
            bId: action.payload.bId,
            expenses: []
        }]

        localStorage.setItem('budgets', JSON.stringify(budgets))

        return budgets
    }

    if (action.type === "ADD_EXPENSE") {
        const oldBudgetIndex = state.findIndex((budget) => {
            return budget.bId === action.payload.bId
        })

        const newExpenses = [{
            bId: action.payload.bId,
            eName: action.payload.eName,
            eAmount: action.payload.eAmount,
            eId: action.payload.eId
        }, ...state[oldBudgetIndex].expenses]

        const newBudget = {
            ...state[oldBudgetIndex],
            expenses: newExpenses
        }

        state[oldBudgetIndex] = newBudget

        return [...state]
    }

    if (action.type === "REMOVE_BUDGET") {
        const budgetId = action.payload

        const newBudgets = state.filter((budget) => {
            return budget.bId !== budgetId
        })

        return newBudgets
    }

    if (action.type === "REMOVE_EXPENSE") {
        const budgetIndex = state.findIndex((budget) => {
            console.log(budget, action.payload.bId)
            return budget.bId === action.payload.bId
        })

        console.log(budgetIndex)

        const budget = state[budgetIndex]

        console.log(budget)

        const newBudget = {
            ...budget, expenses: budget.expenses.filter(exp => {
                return exp.eId !== action.payload.eId
            })
        }

        state[budgetIndex] = newBudget

        return [...state] 
    }

    return initialBudgetState
}

export const budgetContext = createContext(
    {
        budgets: [],
        addBudget: () => { },
        addExpense: () => { },
        removeBudget: () => { },
        removeExpense: () => { }
    }
)

const BudgetContextProvider = ({ children }) => {

    const [budgetsState, dispatchBudget] = useReducer(budgetReducer, initialBudgetState, (initialBudgetState) => JSON.parse(localStorage.getItem('budgets')) || initialBudgetState)

    useEffect(() => {
        localStorage.setItem('budgets', JSON.stringify(budgetsState))
    }, [budgetsState])

    const addBudget = (budget) => {
        dispatchBudget({ type: "ADD_BUDGET", payload: budget })
    }

    const removeBudget = (budgetId) => {
        dispatchBudget({ type: "REMOVE_BUDGET", payload: budgetId })
    }

    const addExpense = (bId) => {
        dispatchBudget({ type: "ADD_EXPENSE", payload: bId })
    }

    const removeExpense = (bId, eId) => {
        dispatchBudget({type: "REMOVE_EXPENSE", payload: {bId, eId}})
    }

    const budgetContextValue = {
        budgets: budgetsState,
        addBudget: addBudget,
        removeBudget: removeBudget,
        addExpense: addExpense,
        removeExpense: removeExpense
    }

    return <budgetContext.Provider value={budgetContextValue}>{children}</budgetContext.Provider>
}

export default BudgetContextProvider



