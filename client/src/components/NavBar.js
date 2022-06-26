import React from 'react'
import Button from './Button'
import '../Navbar.css'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';


const NavBar = ({searchPost}) => {
  const [logged, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  //In every rendering we want to make sure the client is still logged in.
  var one_time = true;
  useEffect(() => {
    if (one_time) {
      checkLogin();
    }
    one_time = false;
  }, []);

  //Here we update the posts we show in the page to the client.
  const sendPostName = async (e) => {
    e.preventDefault();
    searchPost(e.target.value)
  }

  /* here we check if the user logged in to the app,
  only for change the "login" button to "log out" */
  async function checkLogin() { 
    var response = await fetch('http://localhost:5000/getCurrentUser');
    var user = await response.json();
    if (user.username != '') {
      setLoggedIn(true);
    }
  }
  //Here we navigate to the login page after pressing the "login" button.
  const goToLogIn = (e) => {
    e.preventDefault()
    navigate('/LogIn')
  }

  return (
      <nav styles={{...styles.nav_container}} className= "NavbarItems">
        <h1 className="navbar-logo"> DeliciousRecipes</h1>
        <ul className="nav-menu">
          <li>
            <Link to='/' style={{ textDecoration: 'none' }}>
            <p className="nav-links">Home</p>    
            </Link>
          </li>
          <li>
            <Link to= '/CreatePost' style={{ textDecoration: 'none' }}>
            <p className="nav-links">Create Post</p>    
            </Link>
          </li>
          <li>
          <input  className='nav-input' type="text" 
              placeholder="Search for a recipe..."
              onChange={(e) => sendPostName(e)}/> 
              </li> 
              <li>
              <Button onClick={goToLogIn} 
              text={logged ? 'Log Out' : 'Log In'} />
              </li>
        </ul>
      </nav>
  )
}

const styles = {
  nav_container : {
    boxSizing: 'border-box',
    fontFamily: 'Montserrat',
    margin:0
  }
}

export default NavBar;
