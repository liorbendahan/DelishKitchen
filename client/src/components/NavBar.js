import React from 'react'
import { Button } from 'react-bootstrap'
import '../Navbar.css'
import {Link} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export var current_username = '';
export var current_username_password = '';
export var logged_in = false;

const NavBar = () => {
  const [postName, setPostName] = useState('');
  const navigate = useNavigate();
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
            <a className="nav-links">Home</a>    
            </Link>
          </li>
          <li>
            <Link to= '/CreatePost' style={{ textDecoration: 'none' }}>
            <a className="nav-links">Create Post</a>    
            </Link>
          </li>
          <li>
            <input  className='fol' type="text" 
              placeholder="Enter post" value={postName} 
              onChange={(e) => setPostName(e.target.value)}/>  
          </li>
        </ul>
        <Button onClick={goToLogIn}>Log In</Button>
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
