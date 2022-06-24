import React from 'react'
import NavBar from './NavBar.js';
import Post from './Post.js';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({selectCurrentPost}) => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  var one_time = true;
  useEffect(() => {
    if (one_time) {
    searchPosts();
    }
    one_time = false;
  }, []);

  const searchPosts = async (name) => {
    const response = await fetch('http://localhost:5000/getAllPosts');
    const data = await response.json();
    var posts = [];

    if (name != undefined) {
    Array.from(data).forEach((post,index) => (
      posts.push(post)
    ))

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

  function test(post) {
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
            <Post key={index}  post={post}  onDoubleClick={(e) => e.preventDefault() || test(post)}/>))}
        </div>
        ) : (
        <div className="empty">
          <h2>No Posts found yet.</h2>
        </div>
         )}
      </div>
    </div>
  )
}

export default Home;
