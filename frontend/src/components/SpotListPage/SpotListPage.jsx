import { useMemo, useEffect } from 'react'; // react hooks
import { useDispatch, useSelector } from 'react-redux'; //redux hooks for dispatchinga ctions and accessing state
import { getAllSpots } from '../../store/spots'; // thunk to fetch all spots from backend
import { useNavigate } from 'react-router-dom'; // react router hook for navigation

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
    // grid container for all spot cards
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}> 
      {spots.map(spot => (
        <div
          key={spot.id}
          style={{
            border: '1px solid #ccc',
            padding: '10px',
            width: '250px',
            cursor: 'pointer',
            borderRadius: '8px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.1)'
          }}
          onClick={() => navigate(`/spots/${spot.id}`)}
        >
          <img
            src={spot.previewImage || 'https://media.istockphoto.com/id/2155335325/photo/single-family-home-with-clouds.jpg?s=1024x1024&w=is&k=20&c=YRV_yiIwVlV1ZKttYNVSgy9BrGNbn8fnT0gjgTN8QDs='}
            alt={spot.name}
            style={{ width: '100%', height: '160px', objectFit: 'cover', borderRadius: '6px' }}
          />
          <h3>{spot.name}</h3>
          <p><strong>${spot.price}</strong> / night</p>
          <p>{spot.city}, {spot.state}</p>
        </div>
      ))}
    </div>
  );
}

export default SpotListPage;
