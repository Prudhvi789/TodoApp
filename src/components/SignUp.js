import { Button, Container, FormControl, FormGroup, Input, InputLabel } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import fire from '../fire';
import './Login.css';

const SignUp = () => {
    const context = useContext(GlobalContext);
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ repassword, setRepassword] = useState("");
    const userDetails = {
        username : username,
        password : password,
    }

    const handler = (e) => {
        e.preventDefault();
        if(password === repassword ){
            ifSignUp(userDetails)
            setUsername('');
            setPassword('');
            setRepassword('');
        }
        else{
            alert("Passwords doesn't match");
        }    
    }

    const ifSignUp = (userDetails) => {
        fire.auth().createUserWithEmailAndPassword(userDetails.username, userDetails.password)
            .then((userCredential) => {
                // Signed in 
                var user = userCredential.user;
                context.setUser(user);
            })
            .catch((error) => {
                var errorMessage = error.message;
                alert(errorMessage);
            });

    }

    return (
        <Container maxWidth="sm" className="container">
            <h1>Sign Up</h1>
            <FormGroup>
                <FormControl>
                    <InputLabel htmlFor="username">Username</InputLabel>
                    <Input id="username" value={username} onChange={(event)=>{setUsername(event.target.value)}}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="password">Password</InputLabel>
                    <Input id="password" type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}}></Input>
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="repassword">Confirm Password</InputLabel>
                    <Input id="repassword" type="password" value={repassword} onChange={(event)=>{setRepassword(event.target.value)}}></Input>
                </FormControl>
                <Button onClick={handler}>Submit</Button>
            </FormGroup>
        </Container>
    )
}

export default SignUp