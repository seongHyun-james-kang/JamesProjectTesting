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

      // this is saying hey Redux reducer, i'm sending you an action saying: "here's all the spot data, stored by ID"
      case 'spots/LOAD_ALL': 
      return {
        ...action.spots
      };

      case 'spots/ADD_ONE':
        return {
          ...state,
          [action.spot.id]: action.spot
        };  

    default:
      return state;
  }
}


// Thunk, fetch all spots

export const getAllSpots = () => async (dispatch) => {
    const res = await fetch('/api/spots');
    const data = await res.json();
    
    // Normalize Spots by ID
    const normalized = {};
    data.Spots.forEach(spot=> {
        normalized[spot.id] = spot;
    });
    
    dispatch({
        type: 'spots/LOAD_ALL',
        spots: normalized
    });
}

// Thunk to fetch a single spot by ID
export const getSpotById = (spotId) => async (dispatch) => {
    const res = await fetch(`/api/spots/${spotId}`);
    const data = await res.json();
  
    dispatch({
      type: 'spots/ADD_ONE',
      spot: data
    });
  };

// THunk is used to fetch only the spots created by the currently logged-in user.
  export const getCurrentUserSpots = () => async (dispatch) => {
    const res = await csrfFetch('/api/spots/current');
    const data = await res.json();

    console.log("🔍 Fetched current user spots:", data);
    
    const normalized = {};
    data.Spots.forEach((spot) => (normalized[spot.id] = spot));
  
    dispatch({
      type: 'spots/LOAD_ALL',
      spots: normalized
    });
  };