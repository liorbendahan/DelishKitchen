import './Style.css';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import {BrowserRouter as Router,Routes, Route} from 'react-router-dom';
import CreatePost from './components/CreatePost';
import ShowPost from './components/ShowPost';
import { useState, useEffect } from 'react';

const App = () => {
  const[currentTitlePost, setCurrentTitlePost] = useState('');
  const[currentDecPost, setCurrentDecPost] = useState('');
  const[currentUsernamePost, setCurrentUsernamePost] = useState('');
  const[currentLogoPost, setCurrentLogoPost] = useState('');
  const[currentReviewsPost, setCurrentReviewsPost] = useState({});

  const selectCurrentPost = (post) => {
    setCurrentDecPost(post.description);
    setCurrentUsernamePost(post.username);
    setCurrentLogoPost(post.logo);
    setCurrentTitlePost(post.title);
    setCurrentReviewsPost(post.reviews);
  }
  return ( 
    <Router>
      <div className= "App">
      <Routes>
        <Route path='/LogIn' element={<Login />} />
        <Route path='/SignUp' element={<SignUp />}/>
        <Route path='/CreatePost' element={<CreatePost />}/>
        <Route path='/ShowPost' element={<ShowPost title={currentTitlePost} description={currentDecPost}
        username={currentUsernamePost} logo={currentLogoPost} reviews={currentReviewsPost}/>}/>
        <Route exact path='/' element={<Home selectCurrentPost={selectCurrentPost}/>}/>
      </Routes>

      </div>
    </Router>
  );
}

export default App;
