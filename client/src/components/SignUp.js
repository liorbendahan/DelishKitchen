import React from 'react'
import { useState } from 'react';
import { addNewUser } from '../api/posts.js';
import { getAllUsers } from '../api/gets.js';
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';


const SignUp = () => {
  //Variables for the inputs.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirme_password, setConfirmPassword] = useState('');

  /*Handles the inputs, check if the user is taken and if the 2 passwords correspond to each other, 
    Then calls addNewUser() to send the new user to the server.*/
  const CheckNewUser = (e) => {
    e.preventDefault()
    //getAllUsers()- Get all the curent users from the server.
    const users = getAllUsers();
    var already_existing = false;
    //Check if the input username is taken (we loop on all users in db).
    users.map(element => {
      if (element.username === username) {
        //already_existing = true if the username is in the db (the username already exists).
        already_existing = true;
      }
    });

    if (already_existing){
      console.log("USERNAME ALREADY_EXISTS")
    } else{
      if (password === confirme_password) {
        //Here we call addNewUser() for sending the new users parameters.
        addNewUser(username,password);
        setUsername("");
        setPassword("");
        setConfirmPassword("");
        already_existing = false;

      } else{
        console.log("PASSWORD DONT MATCH!");
        already_existing = false;
      }
    }
}

  return (
    <div>
      <form className="center" onSubmit={CheckNewUser}>
        <h1>Sign up</h1>

        <div className="input">
        <input type="text" 
         placeholder="Enter new username" value={username} 
         onChange={(e) => setUsername(e.target.value)}/>
        </div>

        <div className="input">
        <input type="text" 
         placeholder="Enter a password" value={password} 
         onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <div className="input">
        <input type="text" 
         placeholder="Confirm your password" value={confirme_password} 
         onChange={(e) => setConfirmPassword(e.target.value)}/>
        </div>

        <div className='field'>
          <input type='submit' value='Log in'/>
        </div>
        <div className='par'>
        <Link to= '/' style={{ textDecoration: 'none' }}>
          <p>Have an account? Sign In</p>
        </Link>
        </div>
      </form>
    </div>
  )
}

export default SignUp;
