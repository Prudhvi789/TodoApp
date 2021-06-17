import { Container } from '@material-ui/core';
import React  from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import fire from '../fire';
import AddTaskForm from './AddTaskForm';
import Login from './Login';
import TaskList from './TaskList';

const auth = fire.auth();

const Todo = () => {
    const [user] = useAuthState(auth);
   
    return (
        <>
            {
                user ? 
                <Container >
                    <div>
                        <div>
                            <h2>Add Task</h2>
                            <AddTaskForm />
                        </div>
                        <div>
                            <h2>Tasks to be done</h2>
                            <TaskList />
                        </div>
                    </div>
              </Container> 
              : <Login /> 
            }
        </>
    )
}

export default Todo;