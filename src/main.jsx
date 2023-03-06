import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import BudgetContextProvider from './store/budget-context'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BudgetContextProvider>
        <App />
    </BudgetContextProvider>
)
