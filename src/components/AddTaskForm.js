import { Button, Container, FormControl, FormGroup, Input, InputLabel } from '@material-ui/core';
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalState';
import fire from '../fire';
import './AddTaskForm.css';

const AddTaskForm = () => {
    const context = useContext(GlobalContext)
    const [name,setName] = useState("");
    const task = {
        id : Math.random()* 1000000,
        value : {
            name : name,
            userId : context.user.uid 
        }
    }
    const db = fire.firestore();
    //console.log(context.user.uid);

    const handler = () => {
        context.addTask(task);
        db.collection(`users/${''+context.user.uid}/tasks`).doc(''+task.id).set({
            name: name,
            userId : context.user.uid
        })
        .then(() => {
            console.log("Document successfully written!");
        })
        .catch((error) => {
            console.error("Error writing document: ", error);
        });
        setName('');
    }
    
    return (
        <Container className="addContainer">
            <FormGroup>
                <FormControl>
                    <InputLabel htmlFor="task">Task</InputLabel>
                    <Input id="task" value={name} onChange={(event)=>{setName(event.target.value)}}></Input>
                </FormControl>
                <Button onClick={handler}>Add new Task</Button>
            </FormGroup>
        </Container>   
    )
}

export default AddTaskForm;