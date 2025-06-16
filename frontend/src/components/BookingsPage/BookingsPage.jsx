// frontend/src/components/BookingsPage/BookingsPage.jsx

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentUserBookings, deleteBooking } from '../../store/bookings'; // <- also import deleteBooking
import './BookingsPage.css';

export default function BookingsPage() {
  const dispatch = useDispatch();
  const bookings = useSelector(state => state.bookings);
  const bookingList = Object.values(bookings || {});

  useEffect(() => {
    dispatch(getCurrentUserBookings());
  }, [dispatch]);

  const handleDelete = async (bookingId) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;
    await dispatch(deleteBooking(bookingId));
  };

  if (!bookingList.length) return <h2>You have no upcoming bookings.</h2>;

  return (
    <div className="bookings-page">
      <h1>Manage Bookings</h1>
      {bookingList.map(booking => (
        <div key={booking.id} className="booking-tile">
          <h2>{booking.Spot.name}</h2>
          <p>{booking.Spot.city}, {booking.Spot.state}</p>
          <p><strong>Start:</strong> {booking.startDate}</p>
          <p><strong>End:</strong> {booking.endDate}</p>
          <img src={booking.Spot.previewImage} alt={booking.Spot.name} className="booking-preview" />

          <div className="booking-buttons">
            <button onClick={() => alert("Edit feature coming soon")}>Edit</button>
            <button onClick={() => handleDelete(booking.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}
