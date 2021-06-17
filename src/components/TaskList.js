import { Button } from '@material-ui/core';
import React, { useContext, useEffect, useRef, useState } from 'react';
import { GetData } from '../hooks/GetData';
import { GlobalContext } from '../context/GlobalState';
import './TaskList.css';
import fire from '../fire';
import { Edit } from '@material-ui/icons';
import HighlightOff from '@material-ui/icons/HighlightOff';


const TaskList = () => {
    const context = useContext(GlobalContext);
    const [ edit, setEdit ] = useState({id : "" , value : { name : "" , userId : "" }});
    const editRef = useRef();
    const [documents] = GetData();
    const db = fire.firestore();

    const handler = () => {
       const newTask = {
            id : edit.id,
            value : {
                name : editRef.current.value,
                userId : edit.value.userId
            }
        }
        console.log(newTask.value.name);
        context.editTask(newTask);
        db.collection(`users/${context.user.uid}/tasks`).doc(''+newTask.id)
            .update({
                name : newTask.value.name
            })
            .then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
        setEdit({id : "" , value : { name : "" , userId : "" }});
    }  

    const deletehandler = (id) => {
        context.deleteTask(id)
        db.collection(`users/${context.user.uid}/tasks`).doc(''+id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    useEffect(()=>{
            context.setTask(documents)
    },[documents])

    return (
        <>
            {context.task.length > 1 ? context.task.map((ele)=>{
               return (<div key={ele.id}>
                            { edit.id !== ele.id
                                ?   <div className="list">
                                            <Button onClick={()=>{deletehandler(ele.id)}} className="icons" ><HighlightOff /></Button>
                                            <div>{ele.value.name}</div>
                                            <Button onClick={()=>{setEdit(ele)}} className="icons" ><Edit /></Button>
                                    </div>
                                :   <div >
                                        <input ref={editRef} defaultValue={edit.value.name} className="editBox" ></input>
                                        <Button onClick={handler} className="icons">Done</Button>
                                    </div>
                                }
                        </div>)    
          }) : <div>NO TASKS YET</div>
        }
        </>
    )
}

export default TaskList;