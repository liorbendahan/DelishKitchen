import React from 'react'
import Review from './Review'

const Reviews = ({reviews}) => {
  return (
    // Here we call an array of reviews.
    <div>
        {Array.from(reviews).map((review,index) => (
        <Review key={index} review={review}/>))}
    </div>
  )
}

export default Reviews;
