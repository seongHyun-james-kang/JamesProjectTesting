// src/components/ManageSpotsPage/ManageSpotsPage.jsx


// React imports
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Thunk to fetch the current user's spots
import { getCurrentUserSpots } from '../../store/spots';
import { useNavigate, Link } from 'react-router-dom';
import { csrfFetch } from '../../store/csrf';
import './ManageSpotsPage.css';

// its a main component for managing user's own spots

function ManageSpotsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //access spot data
  const spots = useSelector(state => Object.values(state.spots));
  //access currently logged-in user
  const sessionUser = useSelector(state => state.session.user);
  
  console.log('spots:', spots);
  // on component mount or user change, fetch the user's own spots
  useEffect(() => {
    if (sessionUser) dispatch(getCurrentUserSpots());
  }, [dispatch, sessionUser]);
  // navigate to the edit page for a specific spot
  const handleEdit = (id) => navigate(`/spots/${id}/edit`);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this spot?')) {
      await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
      dispatch(getCurrentUserSpots());
    }
  };


  // If user not logged in, show a message
  if (!sessionUser) return <p>Please log in to manage your spots.</p>;
  // render the manage spots UI
  if (spots === undefined) return <p>Loading...</p>; // still fetching

  if (spots.length === 0) {
  return (
    <div className="manage-spots-page">
      <h2>Manage Your Spots</h2>
      <p>You haven’t created any spots yet.</p>
      <button onClick={() => navigate('/spots/new')}>Create a New Spot</button>
    </div>
  );
}
  return (
  <div className="manage-spots-page">
    <h2>Manage Your Spots</h2>
    <button className="create-button" onClick={() => navigate('/spots/new')}>
      Create a New Spot
    </button>

    {spots.length === 0 ? (
      <p>You haven’t created any spots yet.</p>
    ) : (
      <div className="spot-list">
        {spots.map((spot) => (
          <div key={spot.id} className="spot-card">
            <Link to={`/spots/${spot.id}`} className="spot-link">
              <img
                className="spot-preview-image"
                src={spot.previewImage || 'https://via.placeholder.com/300x200'}
                alt={spot.name}
              />
              <h3>{spot.name}</h3>
              <p>{spot.city}, {spot.state}</p>
              <p><strong>${spot.price}</strong> / night</p>
              <p>★ {spot.avgRating ? Number(spot.avgRating).toFixed(1) : 'New'}</p>
            </Link>

            <div className="spot-buttons">
              <button onClick={() => handleEdit(spot.id)}>Update</button>
              <button onClick={() => handleDelete(spot.id)}>Delete</button>
            </div>
          </div>


        ))}
      </div>
    )}
  </div>
  );
}

export default ManageSpotsPage;