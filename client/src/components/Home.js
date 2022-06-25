import React from 'react'
import NavBar from './NavBar.js';
import Post from './Post.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({selectCurrentPost}) => {
  const [posts, setPosts] = useState([]);
  const [lastLogo, setLastLogo] = useState('');
  const navigate = useNavigate();
  //In every render we call this fuction to update all the posts we show to the client.
  var one_time = true;
  useEffect(() => {
    if (one_time) {
    searchPosts();
    }
    one_time = false;
  }, []);
  /*Here we show the posts to the client,
  no matter if the client serched the spesific post he wants to see or not.*/
  const searchPosts = async (name) => {
    const response = await fetch('http://localhost:5000/getAllPosts');
    const data = await response.json();
    console.log(data);
    var posts = [];
    // the var name is the title name the client is searching.
    if (name != undefined) {
    Array.from(data).forEach((post,index) => (
      posts.push(post)
    ))
    //Here we loop al the posts for searching who the client is searching.
    for( var i = 0; i < posts.length; i++){ 
      var postTitle = posts[i].title.toLowerCase()
      name = name.toLowerCase()
      if (!(postTitle.includes(name))) { 
        posts.splice(i, 1); 
        i--; 
      }
  
    }
    setPosts(posts);
  } else {
    setPosts(data);
  }
};
  /*Here we enter after the client dobleClick a spesific post.
  We will navigate to another page to show to full recipie of the post to the client. */
  function ShowPost(post) {
    navigate('/ShowPost');
    selectCurrentPost(post);
  }

  return (
    <div>
      <NavBar searchPost={searchPosts}/>
      <div className="container" >
      {posts?.length > 0 ? (
        <div className="container">
          {Array.from(posts).map((post,index) => (
            <Post key={index}  post={post}  onDoubleClick={(e) => e.preventDefault() || ShowPost(post)}/>))}
        </div>
        ) : (
        <div className="empty">
          <h2>No Posts found yet.</h2>
        </div>
         )}
      </div>
      {}
    </div>
  )
}

export default Home;
