import React from 'react'
import { useState , useEffect} from 'react';
import TextField from '@mui/material/TextField';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import { getAllUsers } from '../api/gets.js';


const Login = () => {
  //Variables for the inputs.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  var one_time = true;
  useEffect(() =>{
    if (one_time) {
      getAllUsers();
      one_time = false;
    }
  },[]);

  /*Get all the current users from the server and then checks if the 
  username and password input are in the db (if the user exists)
  if so, we enter the aplicacion. */
  const onSubmit = (e) => {
    e.preventDefault()
    //getAllUsers()- Get all the curent users from the server.
    const users = getAllUsers();
    var matching = false;
    users.map(element => {
      if (element.username === username &&
        element.password === password)
        {
          //matching = true if the username & password matches the db.
          matching = true;
        }
    });
    if (matching) {
      console.log('Connected!')
      setUsername("")
      setPassword("")
      matching = false;
    } else {
      console.log("Wrong username of password");
    } 
  }
  return (
    <div>
      <form className="center" onSubmit={onSubmit}>
        <h1>Log in</h1>
        <div className="input">
        <input type="text" 
         placeholder="Enter Username" value={username} 
         onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className="input">
        <input type="text" 
         placeholder="Enter Password" value={password} 
         onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <div className='field'>
          <input type='submit' value='Log in'/>
        </div>
        <div className='par'>
        <Link to= '/SignUp' style={{ textDecoration: 'none' }}>
          <p>Need an account? Sign Up</p>    
        </Link>
        </div>
      </form>
    </div>
  )
}

export default Login;
