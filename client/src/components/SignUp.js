import React from 'react'
import { useState } from 'react';
import { addNewUser } from '../api/posts.js';
import {Link} from 'react-router-dom';

const SignUp = () => {
  //Variables for the inputs.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirme_password, setConfirmPassword] = useState('');
  const [loggedSuccessfuly, setLoggedSuccessfuly] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  function sleep(ms){
    return new Promise( resolver => setTimeout(resolver, ms));
   };

  /*Handles the inputs, check if the user is taken and if the 2 passwords correspond to each other, 
    Then calls addNewUser() to send the new user to the server.*/
  async function CheckNewUser(e) {
    e.preventDefault()
    //getAllUsers()- Get all the curent users from the server.
    var response = await fetch('http://localhost:5000/getUsers');
    var users = await response.json();
    var already_existing = false;
    //Check if the input username is taken (we loop on all users in db).
    Array.from(users).map(element => {
      if (element.username === username) {
        //already_existing = true if the username is in the db (the username already exists).
        already_existing = true;
      }
    });
    if (username === '' || password === '' || confirme_password === '') {
      //Displays error message in front for 5 seconds.
      setError1(true);
      await sleep(5000);
      setError1(false);
    }else {
      if (already_existing){
        console.log("USERNAME ALREADY_EXISTS")
        //Displays error message in front for 5 seconds.
        setError2(true);
        await sleep(5000)
        setError2(false);
      } else{
        if (password === confirme_password) {
          //Here we call addNewUser() for sending the new users parameters.
          addNewUser(username,password);
          setUsername("");
          setPassword("");
          setConfirmPassword("");
          already_existing = false;
          //Displays Succssesfull message in front for 5 seconds.
          setLoggedSuccessfuly(true);
          await sleep(5000);
          setLoggedSuccessfuly(false);
        } else{
          console.log("PASSWORD DONT MATCH!");
          already_existing = false;
          //Displays error message in front for 5 seconds.
          setError3(true);
          await sleep(5000);
          setError3(false);
        }
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
        <Link to= '/LogIn' style={{ textDecoration: 'none' }}>
          <p>Have an account? Sign In</p>
        </Link>
        </div>
        <div>
          {error1 && <p>Please fill the fields.</p>}
          {error2 && <p>The username already exists, Please try another one!</p>}
          {error3 && <p>The passwords dont match.</p>}
          {loggedSuccessfuly && <p>Created new Account!</p>}
        </div>
      </form>
    </div>
  )
}

export default SignUp;
