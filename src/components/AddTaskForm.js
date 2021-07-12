import { Button, Container, FormControl, FormGroup, Input, InputLabel } from '@material-ui/core';
import { Add } from '@material-ui/icons';
import React, { useContext, useState } from 'react'
import { GlobalContext } from '../context/GlobalState';
import fire from '../fire';
import './AddTaskForm.css';

const AddTaskForm = () => {
    const context = useContext(GlobalContext)
    const [name,setName] = useState("");
    const task = {
        id : Math.random()* 1000000,
        name : name,
        userId : context.user.uid,
        checked : false 
    }
    const db = fire.firestore();

    const handler = () => {
        context.addTask(task);
        db.collection(`users/${''+context.user.uid}/tasks`).doc(''+task.id).set({
            name: name,
            userId : context.user.uid,
            checked : false
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
            <FormGroup style={{flexDirection: 'row'}}>
                <FormControl style={{marginRight: 10+'px'}}>
                    <InputLabel htmlFor="task">Task</InputLabel>
                    <Input id="task" value={name} onChange={(event)=>{setName(event.target.value)}}></Input>
                </FormControl>
                <Button onClick={handler}><Add /></Button>
            </FormGroup>
        </Container>   
    )
}

export default AddTaskForm;