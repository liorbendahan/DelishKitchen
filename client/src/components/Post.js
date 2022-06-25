import React from 'react'
import style from '../Post.css'


const Post = ({ post: { title, description ,username,logo,reviews} , onDoubleClick}) => {

  return (
    //This is the components of the post we show in the menu page.
    <form className="post" onDoubleClick={onDoubleClick}>
        <div className="title_post">
            <h2>{title}</h2>
        </div>
        <div className="username">
            <h4>Made By: {username}</h4>
        </div>
        <div className="img-container" >
            <img src={`http://localhost:5000/${logo}`} alt="pic 1"/>
        </div>
    </form>
  )
}

export default Post;
