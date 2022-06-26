import { useState } from 'react'
import style from '../AddReview.css'
import TextField from '@mui/material/TextField'; 
import { sendNewReview } from '../api/posts';

const AddReview = ({logo, onAddReview}) => {
  const [review, setReview] = useState('');

  /* Here we enter after the clinet click the submit button, 
  We will check first if he logged in, and after if he writed something in the textbox,
  Only then we will add the review to the post and send it to the server. */
  const onSubmit =async (e) =>{
    e.preventDefault()
    var response = await fetch('http://localhost:5000/getCurrentUser');
    var user = await response.json();
    var loggedIn = false;
    //Checking if the user logged in.
    if (user.username !== '') {
      loggedIn= true;
    }
    if (loggedIn) {
      //checking if the user writed a review in the textbox.
      if(review === '') {
        alert('Please enter first a review!')
      } else {
        /*here we call the fuction sendNewReview(), the propose is to send a post request to the server
        for adding the new review. */
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
             value={review} onChange={(e) => setReview(e.target.value)} variant="outlined" fullWidth multiline />
         </div>
        </div>
        <div>
            <button className="submit-add-review" >Submit</button>
        </div>
    </form>
  )
}

export default AddReview;
