import React from 'react'
import { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { sendCurrentUser } from '../api/posts.js';
import { useNavigate } from 'react-router-dom';



const Login = () => {
  //Variables for the inputs.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errortype, setErroType] = useState(false);
  const navigate = useNavigate();

  function sleep(ms){
    return new Promise( resolver => setTimeout(resolver, ms));
   };

  var one_time = true;
  useEffect( () => {
  if (one_time) {
    sendCurrentUser('', '');
   }
   one_time = false;
  }, []);
  /*Get all the current users from the server and then checks if the 
  username and password input are in the db (if the user exists)
  if so, we enter the aplicacion. */
  async function onSubmit(e) {
    e.preventDefault()
    //getAllUsers()- Get all the curent users from the server.
    var response = await fetch('http://localhost:5000/getUsers');
    var users = await response.json();
    var matching = false;
    Array.from(users).map(element => {
      if (element.username === username &&
        element.password === password)
        {
          //matching = true if the username & password matches the db.
          matching = true;
        }

    });
    if (matching) {
      sendCurrentUser(username, password);
      //Navegates to Home screen.
      navigate('/');
      matching = false;
    } else {
      console.log("Wrong username or password");
      //Displays error message in front for 5 seconds.
      setErroType(true);
      await sleep(5000)
      setErroType(false);
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
        <div className='field-login'>
          <input type='submit' value='Log in'/>
        </div>
        <div className='par'>
        <Link to= '/SignUp' style={{ textDecoration: 'none' }}>
          <p>Need an account? Sign Up</p>    
        </Link>
        </div>
        <div>
          {errortype && <p>Username or password are incorrect, Please try again!</p>}
        </div>
      </form>
    </div>
  )
}

export default Login;
