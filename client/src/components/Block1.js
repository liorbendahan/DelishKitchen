import React from 'react'
import style from '../CreatePost.css';
import { useState} from 'react';


const Block1 = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState('');
  const [uploadDate, setUploadDate] = useState('');
  const [username, setUsername] = useState('');
  return (
    <div>
      <div className="title container-create-post">
          <h1>Create new post</h1>
            <div className="p">
              <p>nejnrkjnjrdddddddddddd</p>
              <div className="input-create-post">
                <input type="text" 
                placeholder="Enter Title" value={title} 
                onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <p>Exelent! now rnnffnfj</p>
              <div className="description">
              <textarea
                name="Enter Title" value={description} 
                onChange={(e) => setDescription(e.target.value)}/>   
              </div>
             </div> 
             
         </div>
    </div>
  )
}

export default Block1;
