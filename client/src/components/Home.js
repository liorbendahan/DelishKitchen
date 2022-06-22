import React from 'react'
import NavBar from './NavBar.js';
import Post from './Post.js';
import { useState, useEffect } from 'react';


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("Coo");
  const [posts, setPosts] = useState([]);

  var one_time = true;
  useEffect(() => {
    if (one_time) {
    searchPosts();
    }
    one_time = false;
  }, []);

  const searchPosts = async () => {
    const response = await fetch('http://localhost:5000/getAllPosts');
    const data = await response.json();
    console.log(data)
    setPosts(data);
  
  };

  const test = (e) => {
    e.preventDefault();
    console.log("yay")
  }
  return (
    <div>
      <NavBar />
      <div className="container" onDoubleClick={test}>
      {posts?.length > 0 ? (
        <div className="container">
          {Array.from(posts).map((post,index) => (
            <Post key={index}  post={post} />))}
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
