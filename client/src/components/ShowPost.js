import React from 'react'
import { useState, useEffect} from 'react';
import NavBar from './NavBar.js';
import style from '../ShowPost.css';
import Reviews from './Reviews'
import AddReview from './AddReview'
import { passCurrentPost } from '../api/posts.js';

const ShowPost = () => {
  const [allReviews, setAllReviews] = useState([]);
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [valid, setValid] = useState(false);
  /*In every render, we want to check if the user is logged in,
  and update all the reviews */
  var one_time = true;
   useEffect( () => {
    if (one_time) {
      getPost()
    }
    one_time = false;
  }, []);
  function sleep(ms){
    return new Promise( resolver => setTimeout(resolver, ms));
   };

   /* This is a function that gets the post the client wants to see,
   he first sends a get request to the server, gets the post and update the useStates.
   We need this fuction to open the ShowPage every render, no matter if the client double clicked the
   post from the home page or the client writed the url just like that in the browser*/
  const getPost =async () => {
    /*getting the url of the logo (It is a part of the url of the page)
    The website url now is .../ShowPost/(the logo that acts like an id)*/
    var logo = window.location.pathname
    logo = logo.split('/')[2];
    //here we send a post request to show to server with post from the db he needs to send to us.
    passCurrentPost(logo);
    setLogo(logo);
    await sleep(100)
    /*here we get the post from the server, (in the backend the server gets the logoName and
    knows wich post to send)*/
    var response = await fetch('http://localhost:5000/getPost');
    var post = await response.json();
    console.log(post)
    if (post === "nothing"){
      console.log("nothing")
    } else {
      setUsername(post.username);
      setDescription(post.description);
      setTitle(post.title);
      setAllReviews(post.reviews);
      setValid(true);
    }
  };
  /*Here we add the new review inserted, this review is not permanent.
  the actually new review is sended to the server and in the next render of the page we put it*/
  const addNewReview =async (review, username) => {
      if (allReviews.length === 0) {
        setAllReviews([{username: username, description: review, date: new Date().toLocaleDateString()}]);
      }else {
        setAllReviews([...allReviews,{username: username, description: review, date: new Date().toLocaleDateString()}]); 
      } 
  };
  return (
    <div>
      <NavBar />
      {valid &&
      <div >
         <div className="third">
            <div className="container-show-post">
              <div className="title_post-show-post username_post-show-post">
              <h1>{title}</h1>
              <h3>Shared By: {username}</h3>
              </div>
              <div className="description-post-show-post">
              <p>{description}</p>
               </div>
               <div className="img-container-show-post">
                {logo && <img src={`http://localhost:5000/${logo}`} alt="pic 1"/>}
              </div>
            </div>
              <div>
              <AddReview logo={logo} onAddReview={addNewReview}/>
              <Reviews className="container-review" reviews={allReviews}/>
              </div>
          </div>
      </div>}
    </div>
  )
}

export default ShowPost;
