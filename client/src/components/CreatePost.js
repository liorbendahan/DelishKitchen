import React from 'react'
import style from '../CreatePost.css'
import { useState} from 'react';
import NavBar from './NavBar.js';
import {sendNewPost, sendImage} from '../api/posts'

const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState({});

  async function handleSubmit(e) {
    e.preventDefault()
    await sendImage(image);
    sendNewPost(title,description);
  }

  const handleFileChange = (e) => {
    const formData = new FormData();
    formData.append('file', e.target.files[0])
    setImage(formData)
    console.log( e.target.files[0])
  }
  
  return (

    <div>
      <NavBar />
      <div className="title container-create-post">
          <h1>Create new post</h1>
            <div className="p">
              <p>enter name of the recipe</p>
              <div className="input-create-post">
                <input type="text" 
                placeholder="Enter Title" value={title} 
                onChange={(e) => setTitle(e.target.value)}/>
              </div>
              <p>Exelent! now enter description</p>
              <div className="description">
              <textarea
                value={description} 
                onChange={(e) => setDescription(e.target.value)}/>   
              </div>
              <div className="logo">
                  <p>nice now lets upload an image:</p>
              </div>
              <div className='img-input'>
              <input type="file" name='file' onChange={handleFileChange} />
              </div>
              <div>
              <button onClick={handleSubmit}>Upload</button>
              </div>
              </div> 
         </div>
    </div>
  )
}

export default CreatePost
