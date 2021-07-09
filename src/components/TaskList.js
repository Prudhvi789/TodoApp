import { Button, Checkbox } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GetData } from '../hooks/GetData';
import { GlobalContext } from '../context/GlobalState';
import './TaskList.css';
import fire from '../fire';
import HighlightOff from '@material-ui/icons/HighlightOff';


const TaskList = () => {
    const context = useContext(GlobalContext);
    const user = JSON.parse(sessionStorage.getItem('user'));
    const [ removed,setRemoved ] = useState(false);
    const [ edit, setEdit ] = useState({id : "" , name : "" , userId : "" });
    const editRef = useRef();
    const [documents] = GetData();
    const db = fire.firestore();

    //console.log(user)

    const handler = () => {
       const newTask = {
            id : edit.id,
            name : editRef.current.value,
            userId : edit.userId
        }
        //console.log(newTask.name);
        context.editTask(newTask);
        db.collection(`users/${user.uid}/tasks`).doc(''+newTask.id)
            .update({
                name : newTask.name
            })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
        setEdit({id : "" , name : "" , userId : "" });
    }  

    const deletehandler = (id) => {
        db.collection(`users/${user.uid}/tasks`).doc(''+id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
        setRemoved(id);
        setTimeout(()=>context.deleteTask(id),1000)
    }

    const checkHandler = (event,ele) => {
        const newTask = {
            id : ele.id,
            name : ele.name,
            userId : ele.userId,
            checked : event.target.checked
        }
        context.editTask(newTask);
        db.collection(`users/${user.uid}/tasks`).doc(''+newTask.id)
            .update({
                checked : newTask.checked
            })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    }

    useEffect(()=>{
            context.setTask(documents)
    },[documents])

    return (
        <div className="task-box">
            {context.task.length ? context.task.map((ele)=>{
               return (<div key={ele.id} className={removed === ele.id ? "list" : null}>
                            { edit.id !== ele.id
                                ?   <div className="list-item">
                                            <Checkbox onChange={(event)=>{checkHandler(event,ele)}}/>
                                            <div onClick={()=>{setEdit(ele)}} style={ele.checked ? {textDecoration: 'line-through'} : null}>{ele.name}</div>
                                            <Button onClick={()=>{deletehandler(ele.id)}} className="icons" ><HighlightOff /></Button>
                                    </div>
                                :   <div >
                                        <input ref={editRef} defaultValue={edit.name} className="editBox" ></input>
                                        <Button onClick={handler} className="icons">Done</Button>
                                    </div>
                                }
                        </div>)    
          }) : <div>NO TASKS YET</div>
        }
        </div>
    )
}

export default TaskList;