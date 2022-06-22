import React from 'react'
import NavBar from './NavBar.js';
import Post from './Post.js';

const Home = () => {
  const test = (e) => {
    e.preventDefault();
    console.log("yay")
  }

  return (
    <div>
      <NavBar />
      <div className="container" onDoubleClick={test}>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </div>
  )
}

export default Home;
