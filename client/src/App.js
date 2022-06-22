import './Style.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import { useState } from 'react';
import CreatePost from './components/CreatePost';


const App = () => {
  const [isLogIn, setIsLogIn] = useState();

  //Currently Ussless
  async function loggedIn(){
    await sleep(2);
    var response = await fetch('http://localhost:5000/getCurrentUser');
    var data = await response.json();
    console.log(data);
  }
  async function sleep(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds*1000));
  }

  return ( 
    <Router>
      <div className= "App">
      <Routes>
        <Route path='/LogIn' element={<Login onClick={loggedIn} />} />
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/CreatePost' element={<CreatePost />}/>
        <Route exact path='/' element={<Home />}/>
      </Routes>

      </div>
    </Router>
  );
}

export default App;
