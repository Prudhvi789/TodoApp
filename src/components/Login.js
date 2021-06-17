import { Button, Container, FormControl, FormGroup, Input, InputLabel } from '@material-ui/core';
import React, { useContext, useState } from 'react';
import { GlobalContext } from '../context/GlobalState';
import fire from '../fire';
import './Login.css';
import SignUp from './SignUp';

const Login = () => {

    const context = useContext(GlobalContext);
    const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ up, setUp ] = useState(false);

    const userDetails = {
        username : username,
        password : password
    }

    const handler = (e) => {
        e.preventDefault();
        ifLogin(userDetails);
        setUsername('');
        setPassword('');
    }

    const ifLogin = (userDetails) => {
        fire.auth().signInWithEmailAndPassword(userDetails.username, userDetails.password)
        .then((userCredential) => {
          // Signed in
          var user = userCredential.user;
          context.setUser(user);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(errorCode,errorMessage);
        });
      }

    return (<div>
                { up ? <SignUp /> : 
                (<Container maxWidth="sm" className="container">
                    <h1>Login</h1>
                    <FormGroup>
                        <FormControl>
                            <InputLabel htmlFor="username">Username</InputLabel>
                            <Input id="username" value={username} onChange={(event)=>{setUsername(event.target.value)}}></Input>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor="password">Password</InputLabel>
                            <Input id="password" type="password" value={password} onChange={(event)=>{setPassword(event.target.value)}}></Input>
                        </FormControl>
                        <Button onClick={handler}>Submit</Button>
                        <div className="sign-up">
                            <div>Not a user ? </div>
                            <button onClick={()=>{setUp(true)}} >SignUp</button>
                        </div>
                    </FormGroup>
                </Container>) }
            </div>)
}

export default Login;