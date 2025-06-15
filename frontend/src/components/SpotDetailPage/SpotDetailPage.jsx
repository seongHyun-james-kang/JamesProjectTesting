import { useEffect } from 'react';
import { useParams } from 'react-router-dom'; //  get spotId from the URL
import { useDispatch, useSelector } from 'react-redux'; //  dispatch thunk and access Redux state
import { getSpotById } from '../../store/spots';// thunk to get spot details from backend
import './SpotDetailPage.css'; // CSS file for this page

export default function SpotDetailPage() {
  const { spotId } = useParams(); // get spotId from URL
  console.log("spotId from URL:", spotId);

  const dispatch = useDispatch(); // set dispatch variable

const spot = useSelector(state => state.spots[Number(spotId)]); // grab spot details from Redux
const currentUser = useSelector(state => state.session.user);
const isOwner = currentUser?.id === spot?.Owner?.id;


console.log("Spot detail loaded:", spot);

  useEffect(() => {
    dispatch(getSpotById(spotId)); // fetch spot details when page loads
  }, [dispatch, spotId]);

  // If spot data hasn't loaded yet, show loading message
  if (!spot || !spot.SpotImages) return <div>Loading...</div>;

  // Get preview image (main)
  const previewImg = spot.SpotImages.find(img => img.preview === true);

  // Get first four nonpreview images
  const otherImgs = spot.SpotImages.filter(img => img.preview !== true).slice(0, 4);

  return (
    <div className="spot-detail-container">
        {/*Spot name/title/location/image containers*/}
      <h1 className="spot-title">{spot.name}</h1>
      <p className="spot-location">{spot.city}, {spot.state}, {spot.country}</p>
      <div className="spot-images-container">
        <img
          src={previewImg ? previewImg.url : ''}
          alt="Main Preview"
          className="preview-image"
        />
        {/*Spot other images */}
        <div className="other-images-grid">
          {otherImgs.map((image, index) => {
            console.log(`image ${index}`, image.url);
            return (
            <img
              key={index}
              src={image.url}
              alt={`Spot image ${index + 1}`}
              className="other-image"
            />
            );
        })}

        </div>
      </div>

          {/*Other info section */}
      <div className="spot-info-section">
        <div className="spot-description-container">
          <h2>Hosted by {spot.Owner.firstName} {spot.Owner.lastName}</h2>
          <p>{spot.description}</p>
        </div>
          {/*Spot rserve/price rate */}
        <div className="reserve-card">
          <div className="price-and-rating">
          <p><strong>${spot.price}</strong> / night</p>
  
        
    <p> {/* this handles decimal format, "New" if no rating, dot between rating and review count, correct singular/plural grammar */}
      <i className="fa-solid fa-star"></i>{' '}
         {spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : 'New'}
         {spot.numReviews > 0 && (
           <>
             {' '}·{' '}
             {spot.numReviews} {spot.numReviews === 1 ? 'Review' : 'Reviews'}
          </>
       )}
     </p>

          </div>
          <button className="reserve-button" onClick={() => alert("Feature coming soon")}>
           Reserve
          </button>
        </div>
      </div> 
      {/*REVIEWS SECTION BELOW*/}
      <div className="reviews-container">
        <h2>
          <i className="fa-solid fa-star"></i>{' '}
          {spot.avgStarRating ? Number(spot.avgStarRating).toFixed(1) : 'New'}
          {spot.numReviews > 0 && (
            <>
              {' '}· {spot.numReviews} {spot.numReviews === 1 ? 'Review' : 'Reviews'}
            </>
          )}
        </h2>

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
              </div>
            ))
        ) : (
          !isOwner && <p>Be the first to post a review!</p>
        )}
      </div>
    </div> 
    
    
  );
}