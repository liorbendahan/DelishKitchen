import React from 'react'
import Button from './Button'
import style from '../CreatePost.css'
import { useState, useEffect} from 'react';
import NavBar from './NavBar.js';
import {sendNewPost, sendImage} from '../api/posts'

const CreatePost = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState({});
  const [wrongImg, setWrongImg] = useState(true);
  const [uploadedPost, setUploadedPost] = useState(false);
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);

  var one_time = true;
  useEffect(() => {
    if (one_time) {
      checkIfLoggedIn();
    }
    one_time = false;
  }, []);

  function sleep(ms){
    return new Promise( resolver => setTimeout(resolver, ms));
   };
  /*Here we enter after the client click in the submit button,
  we will handle all the inputs and check if they are valid,
  we will display erros messages if needed and call sendImage() and sendNewPost() functions */
  async function handleSubmit(e) {
    e.preventDefault()
    console.log(image)
    if (title != '' && description != '') {
      if (!wrongImg){
        //here we call sendImage() and sendNewPost() for sending the image and the input data to the server.
        sendImage(image);
        sendNewPost(title,description)
        //Displays successfull message in front for 5 seconds.
        setUploadedPost(true);
        await sleep(5000)
        setUploadedPost(false);
      } else {
        //Displays error message in front for 5 seconds.
        setError1(true);
        await sleep(5000)
        setError1(false);
      }
    } else {
      //Displays error message in front for 5 seconds.
      setError2(true);
      await sleep(5000)
      setError2(false);
    }
  }
  /* Here we will check the valid of the image input ,
  if its a good image we will update our image state with the image. */
  async function handleFileChange(e) {
    e.preventDefault();
    const formData = new FormData();
    var ending = e.target.files[0].name.split(".");
    var ending = ending[ending.length - 1];
    if(ending === 'jpg' || ending === 'jpeg' || ending === 'png'){
      setWrongImg(false);
      formData.append('file', e.target.files[0])
      setImage(formData)
    } else {
      //Displays error message in front for 5 seconds.
      setError1(true);
      await sleep(5000)
      setError1(false);
    }
  }

  /* Here we check if the client logged to the app, 
  if so we will display the CreatePost page. */
  async function checkIfLoggedIn() {
    var response = await fetch('http://localhost:5000/getCurrentUser');
    var user = await response.json();
    if (user.username != '') {
      setIsLogged(true);
    }
  }
  return (
      <div>
        <NavBar />
        {isLogged ? <div>
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
              <div className='errors'>
              {uploadedPost && <p>Created Post Succssesfuly!</p>}
              {error1 && <p>Please enter a valid image</p>}
              {error2 && <p>Title or Description empties!</p>}
              </div>
               <div className='input-submit'>
                 <input type='submit' onClick={handleSubmit} value='Upload'/>
               </div>
              </div> 
        </div>
    </div> : <h1>Please log in First</h1>}
    </div>
  )
}

export default CreatePost;
