// import react and hooks
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { useParams } from 'react-router-dom';



// import thunk to fetch a single spot by ID
import { getSpotById } from '../../store/spots';

// import flat color icons
import {
    FcHome,
    FcGlobe,
    FcMoneyTransfer,
    FcDocument,
    FcPortraitMode,
    FcCamera
  } from 'react-icons/fc';


function SpotDetailPage() {
    const { spotId } = useParams(); // Gets spotId from URL
    const dispatch = useDispatch(); // Used to dispatch Redux actions

    // Get the spot from Redux using the ID
    const spot = useSelector(state => state.spots[spotId]);

  // run once on component mount to fetch spot details
  useEffect(() => {
    dispatch(getSpotById(spotId)); // Calls backend GET /api/spots/:spotId
  }, [dispatch, spotId]);

  // while loading (before redux has data)
  if (!spot) return <p>Loading spot details...</p>;

return (
    <div style ={{ padding: '20px' }}>
        {/* SPOT name with ICON */}
        <h2><FcHome style = {{marginRight: '8px'}} /> {spot.name} </h2>

    {/* location*/}
    <p>
        <FcGlobe style= {{ marginRight: '8px'}} />
        <strong>Location:</strong> {spot.address}, {spot.city}, {spot.state}, {spot.country}
    </p>
    {/* price */}
    <p>
        <FcMoneyTransfer style= {{ marginRight: '8px'}} />
        <strong>Price per night:</strong> ${spot.price}
    </p>

    {/* Description */}
    <div>
        <FcDocument style= {{ marginRight: '8px'}} />
        <strong>Description:</strong>
        <p>{spot.description}</p>
    </div>

    {/* Hosted by */}
    {spot.Owner && (
    <p>
        <FcPortraitMode style= {{ marginRight: '8px'}} />
        <strong>Hosted by:</strong> {spot.Owner.firstName} {spot.Owner.lastName}    
    </p>
    )}

      {/* Spot Images */}
      {spot.SpotImages?.length > 0 && (
        <div>
          <h3><FcCamera style={{ marginRight: '8px' }} />Photos:</h3>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {spot.SpotImages.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt={spot.name}
                style={{ width: '200px', borderRadius: '8px' }}
              />
            ))}
          </div>
        </div>
      )}
    </div>

    );
 }

export default SpotDetailPage;


