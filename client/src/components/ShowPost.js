import React from 'react'
import { useState, useEffect} from 'react';
import NavBar from './NavBar.js';
import style from '../ShowPost.css';
import Reviews from './Reviews'
import AddReview from './AddReview'

const ShowPost = ({title, description, username, logo, reviews}) => {
  const [allReviews, setAllReviews] = useState([]);
  const [logged, setLoggedIn] = useState(false);

  /*In every render, we want to check if the user is logged in,
  and update all the reviews */
  var one_time = true;
   useEffect( () => {
    if (one_time) {
      updateAllReviews();
      checkLogin();
    }
    one_time = false;
  }, []);
  //here we check if the user is logged in.
  async function checkLogin() { 
    var response = await fetch('http://localhost:5000/getCurrentUser');
    var user = await response.json();
    if (user.username != '') {
      setLoggedIn(true);
    }
  }
  //here we update all the reviews for insert them in the page.
  const updateAllReviews = () => {
      setAllReviews(reviews);
  };
  /*Here we add the new review inserted, this review is not permanent.
  the actully new review is sended to the server and in the next render of the page we put it*/
  const addNewReview =async (review) => {
      console.log(reviews);
      var response = await fetch('http://localhost:5000/getCurrentUser');
      var user = await response.json();
      console.log(allReviews);
      if (allReviews.length === 0) {
        setAllReviews([{username: user.username, description: review, date: new Date().toLocaleDateString()}]);
      }else {
        setAllReviews([...allReviews,{username: user.username, description: review, date: new Date().toLocaleDateString()}]); 
      } 
  }
  return (
    <div>
      <NavBar />
      <div className="container-show-post">
        <div className="img-container-show-post">
          <img src={`http://localhost:5000/${logo}`} alt="pic 1"/>
        </div>
        <div className="title_post-show-post username_post-show-post">
            <h1>{title}</h1>
            <h3>Shared By: {username}</h3>
        </div>
        <div className="description-post-show-post">
            <p>{description}</p>
        </div>
      </div>
      <Reviews reviews={allReviews}/>
      {logged && <AddReview logo={logo} username={username} onAddReview={addNewReview}/>}
    </div>
  )
}

export default ShowPost;
