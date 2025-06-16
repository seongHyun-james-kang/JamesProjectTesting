// SpotDetailPage.jsx

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // get spotId from the URL
import { useDispatch, useSelector } from 'react-redux'; // dispatch thunk and access Redux state
import { getSpotById } from '../../store/spots'; // thunk to get spot details from backend
import ReviewFormModal from '../ReviewFormModal/ReviewFormModal';
import { csrfFetch } from '../../store/csrf';
import './SpotDetailPage.css'; // CSS file for this page

export default function SpotDetailPage() {
  const { spotId } = useParams(); // get spotId from URL
  const dispatch = useDispatch(); // set dispatch variable

  const [showModal, setShowModal] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const spot = useSelector(state => state.spots[Number(spotId)]); // grab spot details from Redux
  const currentUser = useSelector(state => state.session.user);
  const isOwner = currentUser?.id === spot?.Owner?.id;
  const hasUserReviewed = spot?.Reviews?.some(review => review.userId === currentUser?.id);

// console.log("currentUser:", currentUser);
// console.log("isOwner:", isOwner);
// console.log("hasUserReviewed:", hasUserReviewed);

// console.log("Spot detail loaded:", spot);

useEffect(() => {
  dispatch(getSpotById(spotId)); // fetch spot details when page loads
}, [dispatch, spotId]);

// If spot data hasn't loaded yet, show loading message
if (!spot || !spot.SpotImages) return <div>Loading...</div>;

// get preview image (main)
const previewImg = spot.SpotImages.find(img => img.preview === true);

// get first four non-preview images
const otherImgs = spot.SpotImages.filter(img => !img.preview).slice(0, 4);

const handleBooking = async () => {
  console.log("Submitting booking:", { startDate, endDate });
  try {
    const res = await csrfFetch(`/api/spots/${Number(spotId)}/bookings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ startDate, endDate })
    });

    if (res.ok) {
      alert('Booking successful!');
      setStartDate('');
      setEndDate('');
      dispatch(getSpotById(spotId)); // Refresh data
    }
  } catch (err) {
    let message = 'Booking failed.';
    if (err instanceof Response) {
      try {
        const errorData = await err.json();
        message = errorData.message || message;
      } catch {}
    }
    alert(message);
  }
};

const handleDeleteReview = async (reviewId) => {
  if (!window.confirm("Are you sure you want to delete this review?")) return;

  try {
    const res = await csrfFetch(`/api/reviews/${reviewId}`, {
      method: 'DELETE'
    });
    if (res.ok) {
      dispatch(getSpotById(spotId)); // refresh reviews
    }
  } catch (err) {
    const errorData = await err.json();
    alert(errorData.message || 'Failed to delete review.');
  }
};

return (
  <div className="spot-detail-container">
    {/* spot name/title/location/image containers */}
    <h1 className="spot-title">{spot.name}</h1>
    <p className="spot-location">{spot.city}, {spot.state}, {spot.country}</p>

    <div className="spot-images-container">
      <img
        src={previewImg ? previewImg.url : ''}
        alt="Main Preview"
        className="preview-image"
      />

      {/* spot other images */}
      <div className="other-images-grid">
        {otherImgs.map((image, index) => (
          <img
            key={index}
            src={image.url}
            alt={`Spot image ${index + 1}`}
            className="other-image"
          />
        ))}
      </div>
    </div>

    {/* other info section */}
    <div className="spot-info-section">
      {/* description on the left */}
      <div className="spot-description-container">
        <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
        <p>{spot.description}</p>
      </div>

      {/* reserve box on the right */}
      <div className="spot-detail-right">
      <div className="reserve-card">
        <p><strong>${spot.price}</strong> / night</p>
        <p>
          <i className="fa-solid fa-star"></i>{' '}
          {spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : 'New'}
          {spot.numReviews > 0 && (
            <> · {spot.numReviews} {spot.numReviews === 1 ? 'Review' : 'Reviews'}</>
          )}
        </p>
        <button
            className="reserve-button"
            disabled={!startDate || !endDate}
            onClick={handleBooking}
          >
            Reserve
        </button>
      </div>

      <div className="booking-form">
        <label>Start Date:
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        </label>
        <label>End Date:
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </label>
        <button
          className="reserve-button"
          disabled={!startDate || !endDate}
          onClick={handleBooking}
        >
          Book Now
        </button>
      </div>
    </div>

    </div>

    {/* REVIEWS SECTION BELOW */}
    <div className="reviews-container">
      <h2>
        <i className="fa-solid fa-star"></i>{' '}
        {spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : 'New'}
        {spot.numReviews > 0 && (
          <> · {spot.numReviews} {spot.numReviews === 1 ? 'Review' : 'Reviews'}</>
        )}
      </h2>

      {currentUser && !isOwner && !hasUserReviewed && (
        <>
          <button
            className="post-review-button"
            onClick={() => setShowModal(true)}
          >
            Post Your Review
          </button>
          {showModal && (
            <ReviewFormModal
              spotId={spot.id}
              onClose={() => {
                setShowModal(false);
                dispatch(getSpotById(spot.id)); // refresh spot data after review
              }}
            />
          )}
        </>
      )}

      {spot.Reviews?.length > 0 ? (
        [...spot.Reviews]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map(review => (
            <div key={review.id} className="review">
              <h3>{review.User.firstName}</h3>
              <p className="review-date">
                {new Date(review.createdAt).toLocaleString('default', {
                  month: 'long',
                  year: 'numeric'
                })}
              </p>
              <p>{review.review}</p>
              {currentUser?.id === review.userId && (
                <button
                  className="delete-review-button"
                  onClick={() => handleDeleteReview(review.id)}
                >
                  Delete
                </button>
              )}
            </div>
          ))
      ) : (
        !isOwner && <p>Be the first to post a review!</p>
      )}
    </div>
  </div>
);
}