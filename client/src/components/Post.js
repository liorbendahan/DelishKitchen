import React from 'react'
import style from '../Post.css'

const Post = ({onDoubleClick}) => {
  return (
    <div className="movie" onDoubleClick={onDoubleClick}>
        <div>
            <h2>lior</h2>
        </div>
        <div>
            <p>lior</p>
        </div>
        <div className="img-container" >
            <img src={'https://media.istockphoto.com/photos/mountain-landscape-picture-id517188688?k=20&m=517188688&s=612x612&w=0&h=i38qBm2P-6V4vZVEaMy_TaTEaoCMkYhvLCysE7yJQ5Q='} alt="pic 1"/>
        </div>
    </div>
  )
}

export default Post;
