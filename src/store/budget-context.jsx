import { createContext, useReducer, useEffect } from "react";

import { budgetReducer, initialBudgetState } from "../reducers/BudgetReducer";

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



