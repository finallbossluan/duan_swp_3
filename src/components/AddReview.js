import React, { useState } from 'react';
import SummaryApi from '../common';
import './app.css';
function AddReview({ productId, onReviewAdded }) {
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isAnonymous, setIsAnonymous] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const response = await fetch(SummaryApi.AddReview.url, {
            method: SummaryApi.AddReview.method,
            credentials: 'include',
            headers: {
              "content-type": "application/json"
            },
            body: JSON.stringify({
              productId,
              comment,
              rating,
              isAnonymous,
            })
          });
      
          const data = await response.json();
          if (data.success) {
            onReviewAdded(); // Cập nhật danh sách đánh giá
            setRating(0); 
            setComment('');
            setIsAnonymous(false);
          } else {
            console.error('Failed to add review:', data.message);
          }
        } catch (error) {
          console.error('Error submitting review:', error);
        }
      };

    return (
      <div className="add-review">
      <h2>Đánh giá sản phẩm</h2>
      <form onSubmit={handleSubmit}>
              <div className="stars">
                  {[1, 2, 3, 4, 5].map((star) => (
                      <span
                          key={star}
                          className={`star ${rating >= star ? 'selected' : ''}`}
                          onClick={() => setRating(star)}
                      >
                          ★
                      </span>
                  ))}
          </div>
                <br />
                <label>
                    Nhận xét:
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        required />

                <input
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={() => setIsAnonymous(!isAnonymous)}
                />
                Đánh giá ẩn danh
            </label>
            <br />
                <button type="submit">Gửi Đánh Giá</button>
            </form>
        </div>
    );
}

export default AddReview;
