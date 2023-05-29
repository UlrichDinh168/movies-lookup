import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';


const Reviews = (props: any) => {
  const { movie } = props;
  const [reviews] = useState(movie[4]);

  return (
    <>
      <div className="movie-reviews">
        <div className="div-title">Reviews {reviews.results.length > 0 ? reviews.results.length : ''}</div>
        {reviews.results.length ? (
          reviews.results.map((data: any) => (
            <div className="reviews" key={uuidv4()}>
              <h3>{data.author}</h3>
              <div>{data.content}</div>
            </div>
          ))
        ) : (
          <p>No reviews to show</p>
        )}
      </div>
    </>
  );
};



export default Reviews;