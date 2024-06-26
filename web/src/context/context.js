import React, { createContext, useReducer } from 'react'
import { reducer } from './reducer';

export const GlobalContext = createContext("Initial Value");

let data = {
    user: {},
    isAdmin: false,
    isLogin: null,
    baseURL: (window.location.href.includes('localhost')) ?
        `http://localhost:5001/api/v1` : `/api/v1`

}

export default function ContextProvider({ children }) {
    const [state, dispatch] = useReducer(reducer, data)
    return (
        <GlobalContext.Provider value={{ state, dispatch }}>
            {children}
        </GlobalContext.Provider>
    )
}