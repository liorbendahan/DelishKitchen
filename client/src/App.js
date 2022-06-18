import './App.css';
import { useState } from 'react';
import { SendNewUser } from './api/posts.js';



const App = () => {
  const [username, setUsername] = useState('');

  const addUser = (e) => {
    e.preventDefault()
    SendNewUser(username)
  }

  return (
    <form className="App" onSubmit={addUser}>
      <div className="form-control">
         <label>Insert Task</label>
         <input type="text" 
         placeholder="Type here..." value={username} 
         onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <input type='submit' value='Save Task' className='btn btn-block'/>
    </form>
  );
}

export default App;
