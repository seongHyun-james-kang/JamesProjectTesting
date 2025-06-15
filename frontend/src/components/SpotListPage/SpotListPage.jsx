import { useMemo, useEffect } from 'react'; // react hooks
import { useDispatch, useSelector } from 'react-redux'; //redux hooks for dispatchinga ctions and accessing state
import { getAllSpots } from '../../store/spots'; // thunk to fetch all spots from backend
import { useNavigate } from 'react-router-dom'; // react router hook for navigation
import './SpotListPage.css';

function SpotListPage() {
  const dispatch = useDispatch(); //use to dispatch getAllSpots()
  const navigate = useNavigate(); //Allows redirecting when a spot card is clocked


  const allSpots = useSelector(state => state.spots); // get raw object from Redux
  const spots = useMemo(() => Object.values(allSpots), [allSpots]); // memoize the array to avoid rerenders

  useEffect(() => {
    dispatch(getAllSpots()); // triggers the thunk to fetch from GET /api/spots
  }, [dispatch]);

  if (!spots.length) return <p>Loading spots...</p>; // show loading text if spots haven't loaded yet

  return (
    <div style={{ width: '100%' }}> 
      <div className="spot-grid-container">
        {spots.map(spot => (
          <div
            key={spot.id}
            className="spot-card"
            title={spot.name}
            onClick={() => navigate(`/spots/${spot.id}`)}
          >
            <img
              src={
                spot.previewImage ||
                'https://media.istockphoto.com/id/2155335325/photo/single-family-home-with-clouds.jpg'
              }
              alt={spot.name}
              className="spot-image"
            />


        <div className="spot-header">
          <span>{spot.city}, {spot.state}</span>
          <span className="spot-rating">
            <i className="fa-solid fa-star"></i>{' '}
            {Number(spot.avgStarRating) ? Number(spot.avgStarRating).toFixed(1) : 'New'}
          </span>
        </div>

        <p className="spot-name">{spot.name}</p>
        <p><strong>${spot.price}</strong> / night</p>
          </div>
        ))}
      </div>
    </div>
  );
}
export default SpotListPage;
