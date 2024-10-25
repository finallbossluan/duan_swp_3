
import React from 'react';

const ReviewList = ({ reviews }) => {
  return (
    <div className="review-list">
      <h3>Các đánh giá:</h3>
      {reviews.length === 0 ? (
        <p>Chưa có đánh giá nào.</p>
      ) : (
        <ul>
          {reviews.map((review) => (
            <li key={review._id} className="review-item">
              <div className="review-rating">
                <span>Đánh giá: </span>
                {[...Array(review.rating)].map((_, index) => (
                  <span key={index} className="star">★</span>
                ))}
              </div>
              <p>{review.comment}</p>
              <div className="review-date">{new Date(review.createdAt).toLocaleDateString()}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReviewList;
