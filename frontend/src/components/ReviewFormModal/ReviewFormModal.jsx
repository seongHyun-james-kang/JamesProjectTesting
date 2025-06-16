//ReviewFormModal.jsx

import { useState } from 'react';
import './ReviewFormModal.css';

export default function ReviewFormModal({ spotId, onClose }) {
  const [reviewText, setReviewText] = useState('');
  const [stars, setStars] = useState(0);
  const [errors, setErrors] = useState([]);

  console.log("reviewText:", reviewText.length, "stars:", stars);

  // handle review form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]); // clear previous errors

    // frontend validation check
    if (reviewText.length < 10 || stars === 0) return;
    
    try {

    const csrfToken = document.cookie
    .split('; ')
     .find(row => row.startsWith('XSRF-TOKEN='))
     ?.split('=')[1];

      const res = await fetch(`/api/spots/${spotId}/reviews`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'X-CSRF-Token': csrfToken
         },
        body: JSON.stringify({ review: reviewText, stars }),
        credentials: 'include' // required if the app uses cookies for login/session
      });

      const data = await res.json();
      
      if (res.ok) {
        onClose(); // close modal after successful review
        window.location.reload(); //force-refresh data
      } else {
        // handle backend errors safely        
        if (data && typeof data === 'object') {
            let errorList;

            if (data.errors) {
              errorList = Object.values(data.errors);
            } else {
              errorList = [data.message || 'Failed to submit review'];
            }

            setErrors(errorList);            
        } else {
          setErrors(['Something went wrong.']);
          console.log("Backend error response:", data);
        }
      }
    } catch (err) {
      console.error(err);
      setErrors(['Unexpected server error.']);
    }
    

  };
  

  return (
    <div className="modal-background">
      <div className="modal-content">
        {/* Modal title */}
        <h2>How was your stay?</h2>

        {/* show validation or server errors */}
        {Array.isArray(errors) &&
        errors.map((err, i) => (
        <p key={i} className="error">{err}</p>
        ))}

        {/* review form */}
        <form onSubmit={handleSubmit}>
        {/* review textarea */}
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Leave your review here..."
          />
        {/* star rating input */}
          <div className="star-input">
            {[1, 2, 3, 4, 5].map(num => (
              <span
                key={num}
                className={num <= stars ? 'filled-star' : 'empty-star'}
                onClick={() => setStars(num)}
              >
                ★
              </span>
            ))}
            <span>Stars</span>
          </div>
            {/* submit button */}
          <button
            type="submit"
            disabled={reviewText.length < 10 || stars === 0}
          >
            Submit Your Review
          </button>
        </form>
            {/* close modal button */}
        <button onClick={onClose} className="close-btn">X</button>
      </div>
    </div>
  );
}
