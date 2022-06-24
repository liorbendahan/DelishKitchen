import React from 'react'
import { useState, useEffect} from 'react';
import NavBar from './NavBar.js';
import style from '../ShowPost.css';

const ShowPost = ({title, description, username, logo}) => {
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
    </div>
  )
}

export default ShowPost;
