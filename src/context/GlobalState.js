import React, { createContext, useReducer} from 'react';
import AppReducer from "./AppReducer";

// Initial state
if(!JSON.parse(localStorage.getItem('transactions')))
{
    var transactions = [];
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

const initialState = {
    transactions: JSON.parse(localStorage.getItem('transactions')) ? JSON.parse(localStorage.getItem('transactions')) : []
}

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider= ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer, initialState);

    // Actions

    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }

    localStorage.setItem('transactions', JSON.stringify(state.transactions));

    return (<GlobalContext.Provider value = {{
        transactions: state.transactions,
        deleteTransaction,
        addTransaction
    }}>
        {children}
    </GlobalContext.Provider>);
}