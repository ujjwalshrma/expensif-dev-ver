import { useContext } from "react"
import { budgetContext } from "./store/budget-context"

import TotalExpense from "./components/TotalExpense/TotalExpense";

//budgets components
import BudgetForm from "./components/Budgets/BudgetForm";
import Budget from "./components/Budgets/Budget";

//expenses components
import ExpensesForm from "./components/Expenses/ExpensesForm";

function App() {
    const budgetCtx = useContext(budgetContext)
    const budgets = budgetCtx.budgets

    return (
        <main>
            <TotalExpense budgets={budgets} />
            <BudgetForm addBudget={budgetCtx.addBudget} />
            {budgets.length > 0 && (
                <ExpensesForm addExpense={budgetCtx.addExpense} budgets={budgets} />
            )}
            <Budget budgets={budgets} removeBudget={budgetCtx.removeBudget} removeExpense={budgetCtx.removeExpense} />
        </main>
    )
}

export default App
