import { useState } from 'react'
import style from '../AddReview.css'
import TextField from '@mui/material/TextField'; 
import { sendNewReview } from '../api/posts';
import Axios from 'axios';

const AddReview = ({logo, onAddReview}) => {
  const [review, setReview] = useState('');
  const onSubmit =async (e) =>{
    e.preventDefault()

    var response = await fetch('http://localhost:5000/getCurrentUser');
    var user = await response.json();
    var loggedIn = false;
    if (user.username !== '') {
      loggedIn= true;
    }
    if (loggedIn) {
      if(review === '') {
        alert('Please enter first a review!')
      } else {
        sendNewReview(review,logo);
        onAddReview(review, user.username);
        setReview('');
      } 
    }else {
      alert('Please login first!')
    }
  }

  return (
    <form className="container-add-review" onSubmit={onSubmit}>
        <div className="title-add-review">
         <h2>Insert Review</h2>
         <div className="container-input-add-review input-add-review">
            <TextField id="outlined-basic" label="Type your review here..." color='primary' 
            onChange={(e) => setReview(e.target.value)} variant="outlined" fullWidth multiline />
         </div>
        </div>
        <div>
            <button className="submit-add-review" >Submit</button>
        </div>
    </form>
  )
}

export default AddReview;
