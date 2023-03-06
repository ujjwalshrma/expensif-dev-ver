import { createContext, useReducer, useEffect } from "react";

const initialBudgetState = []

const budgetReducer = (state, action) => {
    switch (action.type) {
        case "ADD_BUDGET":
            const budgets = [...state, {
                bName: action.payload.bName,
                bAmount: action.payload.bAmount,
                bId: action.payload.bId,
                expenses: []
            }]

            localStorage.setItem('budgets', JSON.stringify(budgets))

            return budgets

        case "ADD_EXPENSE":
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

        default:
            return initialBudgetState
    }
}

export const budgetContext = createContext(
    {
        budgets: [],
        addBudget: () => { },
        addExpense: () => { },
        removeBudget: () => { }
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

    const addExpense = (bId) => {
        dispatchBudget({ type: "ADD_EXPENSE", payload: bId })
    }

    const budgetContextValue = {
        budgets: budgetsState,
        addBudget: addBudget,
        removeBudget: () => { },
        addExpense: addExpense
    }

    return <budgetContext.Provider value={budgetContextValue}>{children}</budgetContext.Provider>
}

export default BudgetContextProvider



