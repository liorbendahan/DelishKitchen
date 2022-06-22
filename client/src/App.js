import './Style.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import CreatePost from './components/CreatePost';


const App = () => {

  return ( 
    <Router>
      <div className= "App">
      <Routes>
        <Route path='/LogIn' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/CreatePost' element={<CreatePost />}/>
        <Route exact path='/' element={<Home />}/>
      </Routes>

      </div>
    </Router>
  );
}

export default App;
