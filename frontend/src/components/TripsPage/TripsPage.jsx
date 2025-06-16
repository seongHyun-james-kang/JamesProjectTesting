import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentBookings } from '../../store/bookings'; 
import { useNavigate } from 'react-router-dom';
import './TripsPage.css';

export default function TripsPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const bookings = useSelector(state => Object.values(state.bookings));
  const spots = bookings.map(booking => booking.Spot);

  useEffect(() => {
    dispatch(getCurrentBookings());
  }, [dispatch]);

  if (!bookings.length) return <h2>You don’t have any trips booked yet!</h2>;

  return (
    <div className="trips-container">
      <h1>Manage Bookings</h1>
      {bookings.map(booking => {
        const spot = booking.Spot;
        return (
          <div key={booking.id} className="trip-card">
            <img src={spot.previewImage} alt={spot.name} />
            <div>
              <h2>{spot.name}</h2>
              <p>{spot.city}, {spot.state}</p>
              <p>From: {booking.startDate}</p>
              <p>To: {booking.endDate}</p>
              {/* add delete function */}
            </div>
          </div>
        );
      })}
    </div>
  );
}
