import { useContext, useState } from "react"
import { budgetContext } from "./store/budget-context"

import TotalExpense from "./components/TotalExpense/TotalExpense";

import UserName from "./components/UserName/UserName";

//budgets components
import BudgetForm from "./components/Budgets/BudgetForm";
import Budget from "./components/Budgets/Budget";

//expenses components
import ExpensesForm from "./components/Expenses/ExpensesForm";

function App() {
    const [isEnteredNameValid, setIsEnteredNameValid] = useState(false)
    const [userName, setUserName] = useState('')

    const budgetCtx = useContext(budgetContext)
    const budgets = budgetCtx.budgets

    const checkEnteredName = (name) => {
        if (name.trim('') !== '') {
            setUserName(name)
            setIsEnteredNameValid(true)
            localStorage.setItem('name', JSON.stringify(name))
        } else {
            setIsEnteredNameValid(false)
        }
    }

    if (!isEnteredNameValid) {
        return <UserName userName={checkEnteredName} />
    }

    return (
        <>
            <h1 className='user-name'>Hi👋, {userName}</h1>
            <TotalExpense budgets={budgets} />
            <BudgetForm addBudget={budgetCtx.addBudget} />
            {
                budgets.length > 0 && (
                    <ExpensesForm addExpense={budgetCtx.addExpense} budgets={budgets} />
                )
            }
            <Budget budgets={budgets} removeBudget={budgetCtx.removeBudget} removeExpense={budgetCtx.removeExpense} />
        </>
    )
}

export default App
