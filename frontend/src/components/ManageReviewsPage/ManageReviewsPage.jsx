// frontend/src/components/ManageReviewsPage/ManageReviewsPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserReviews } from '../../store/reviews';

export default function ManageReviewsPage() {
  const dispatch = useDispatch();
  const reviews = useSelector(state => state.reviews?.byUser || {});
  const reviewList = Object.values(reviews);
  
  useEffect(() => {
    dispatch(getCurrentUserReviews());
  }, [dispatch]);

  if (!reviewList.length) return <h2>You have no reviews yet.</h2>;
  if (!state.reviews) return <h2>Loading reviews...</h2>;

  return (
    <div>
      <h1>Manage Reviews</h1>
      {reviewList.map(review => (
        <div key={review.id} className="review-tile">
          <h2>{review.Spot.name}</h2>
          <p>{new Date(review.createdAt).toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
          <p>{review.review}</p>
          <button onClick={() => alert("Edit feature coming soon")}>Update</button>
          <button onClick={() => alert("Delete feature coming soon")}>Delete</button>
        </div>
      ))}
    </div>
  );
}
