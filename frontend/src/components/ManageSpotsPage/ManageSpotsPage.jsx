// src/components/ManageSpotsPage/ManageSpotsPage.jsx



import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserSpots } from '../../store/spots';
import { useNavigate, Link } from 'react-router-dom';

function ManageSpotsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const spots = useSelector(state => Object.values(state.spots));
  const sessionUser = useSelector(state => state.session.user);

  useEffect(() => {
    if (sessionUser) dispatch(getCurrentUserSpots());
  }, [dispatch, sessionUser]);

  const handleEdit = (id) => navigate(`/spots/${id}/edit`);

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this spot?')) {
      await csrfFetch(`/api/spots/${id}`, { method: 'DELETE' });
      dispatch(getCurrentUserSpots());
    }
  };

  if (!sessionUser) return <p>Please log in to manage your spots.</p>;

  return (
    <div className="manage-spots-page">
      <h2>Manage Your Spots</h2>
      <button onClick={() => navigate('/spots/new')}>Create a New Spot</button>
      {spots.map(spot => (
        <div key={spot.id} className="spot-card">
          <Link to={`/spots/${spot.id}`}>
            <img src={spot.previewImage} alt={spot.name} />
            <h3>{spot.name}</h3>
          </Link>
          <p>{spot.city}, {spot.state}</p>
          <p>${spot.price} / night</p>
          <button onClick={() => handleEdit(spot.id)}>Edit</button>
          <button onClick={() => handleDelete(spot.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}

export default ManageSpotsPage;