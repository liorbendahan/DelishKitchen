import React from 'react'
import style from '../Review.css'

const Review = ({review:{username, description, date}}) => {
  //This is the build of the review.
  return (
    <div className="container-review">
      <div className="title-review">
        <h4>By: {username}</h4>
      </div>
      <div className="description-review">
        <p>{description}</p>
      </div>
      <div className="date-review">
        <p>UploadDate: {date}</p>
      </div>
    </div>
  )
}

export default Review;
