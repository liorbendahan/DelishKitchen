import './Style.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import {BrowserRouter as Router,Routes, Route,Switch, Link} from 'react-router-dom';

const App = () => {

  return ( 
    <Router>
      <div className= "App">

      <Routes>
        <Route exact path='/' element={<Login />}/>
        <Route path='/SignUp' element={<SignUp />}/>
      </Routes>

      </div>
    </Router>
  );
}

export default App;
