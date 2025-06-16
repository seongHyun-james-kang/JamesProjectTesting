// frontend/src/store/bookings.js
import { csrfFetch } from './csrf';

// action types
const LOAD_BOOKINGS = 'bookings/load';
const REMOVE_BOOKING = 'bookings/remove';

// action creators
const loadBookings = (bookings) => ({
  type: LOAD_BOOKINGS,
  bookings
});

const removeBooking = (bookingId) => ({
  type: REMOVE_BOOKING,
  bookingId
});

// thuunks
export const getCurrentUserBookings = () => async (dispatch) => {
  const res = await csrfFetch('/api/bookings/current');
  if (res.ok) {
    const data = await res.json();
    dispatch(loadBookings(data.bookings));
  }
};

export const deleteBooking = (bookingId) => async (dispatch) => {
  const res = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: 'DELETE'
  });
  if (res.ok) {
    dispatch(removeBooking(bookingId));
  }
};

// reducer
export default function bookingsReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_BOOKINGS: {
      const newState = {};
      action.bookings.forEach(b => newState[b.id] = b);
      return newState;
    }
    case REMOVE_BOOKING: {
      const newState = { ...state };
      delete newState[action.bookingId];
      return newState;
    }
    default:
      return state;
  }
}
