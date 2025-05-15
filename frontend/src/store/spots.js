// Holds state for all spots
// Handles createSpot thunk


// frontend/src/store/spots.js
// Importing csrfFetch to make secure API requests
import { csrfFetch } from './csrf';

// ACTION TYPES
// Action type constant
const CREATE_SPOT = 'spots/CREATE_SPOT';

// ACTIONS
// Action creator - return an action object

const create = (spot) => ({
  type: CREATE_SPOT,
  spot
});

// THUNK function to POST a new spot to the backend API

export const createSpot = (spotData) => async (dispatch) => {
  const res = await csrfFetch('/api/spots', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(spotData),
  });

  // Get the newly created spot from the response
  const newSpot = await res.json();
  // Dispatch action to store new spot in Redux
  dispatch(create(newSpot));
  // Return the created spot
  return newSpot;
};

// Initial state: no spots yet
const initialState = {};

// Reducer function to handle spot actions
export default function spotsReducer(state = initialState, action) {
  switch (action.type) {
    case CREATE_SPOT:
        // Add the new spot to the state using its ID as the key
      return {
        ...state,
        [action.spot.id]: action.spot
      };
    default:
      return state;
  }
}
