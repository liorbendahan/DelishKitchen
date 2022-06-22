import React from 'react'
import style from '../Post.css'

const Post = ({ post: { title, description ,username,logo} , onDoubleClick}) => {
  return (
    <div className="movie" onDoubleClick={onDoubleClick}>
        <div>
            <h2>{title}</h2>
        </div>
        <div>
            <p>Made By: {username}</p>
        </div>
        <div className="img-container" >
            <img src={`http://localhost:5000/${logo}`} alt="pic 1"/>
        </div>
    </div>
  )
}

export default Post;
