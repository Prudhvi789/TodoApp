import React, { createContext, useReducer } from 'react';
import {AppReducer} from './AppReducer';
//import { GetData } from './GetData';

const user = JSON.parse(sessionStorage.getItem('user'));
const tasks = JSON.parse(sessionStorage.getItem('tasks'));

const initialState={
    user : user ? user : {},
    task : tasks ? tasks : []
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = ({children}) => {

    const [state,dispatch] = useReducer(AppReducer,initialState)

    const setUser = (user) => {
        dispatch({
            type : 'SET_USER',
            payload : user
        })
    }

    const setTask = (task) => {
        dispatch({
            type : 'SET_TASK',
            payload : task
        })
    }

    const addTask = (task) => {
        dispatch({
            type : 'ADD_TASK',
            payload : task
        })
    }

    const deleteTask = (id) => {
        dispatch({
            type : 'DELETE_TASK',
            payload : id
        })
    }

    const editTask = (task) => {
        dispatch({
            type : 'EDIT_TASK',
            payload : task
        })
    }


    return (
        <GlobalContext.Provider value={{
            user : state.user,
            task : state.task,
            setUser,
            setTask,
            addTask,
            deleteTask,
            editTask           
        }}>
            {children}
        </GlobalContext.Provider>
    )
}