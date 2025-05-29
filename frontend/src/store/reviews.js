// frontend/src/store/reviews.js

// ACTION TYPES
const LOAD_BY_SPOT = 'reviews/LOAD_BY_SPOT'; // Action type for loading reviews by spot ID

// Action Creators
const loadReviews = (spotId, reviews) => ({
    type: LOAD_BY_SPOT, // type of action
    reviews, // array of reviews
    spotId // spot ID for which reviews are being loaded
});


// thunk to get all reviews for a specific spot
// this gets your instructions and talks to the backend to retrieve the result

export const getReviewsBySpotId = (spotId) => async (dispatch) => {
    const res = await fetch (`/api/spots/${spotId}/reviews`); // call API to get reviews by spot
    if (res.ok) {
        const data = await res.json(); // Parse the JSON response
        dispatch(loadReviews(spotId, data.Reviews)); // load reviews into Redux store
      }
    };
    

// Reducer- receives all actions & decies how to update the app's memory

const initialState = {}; // initial state in an empty object

export default function reviewsReducer(state = initialState, action) {
    switch (action.type) {
        case LOAD_BY_SPOT: { // its saying i'm going to use this string to represent the action of loading all reviews for a specific spot
            const normalized = {}; // create an object to store reviews by review ID
            action.reviews.forEach(review => {
                normalized[review.id] = review;
            });
            return {
                ...state, // keep existing state
                [action.spotId]: normalized // set normalized reviews under the spotId key
            };
            }
            default:
                return state; // return unchanged state
    }
}


