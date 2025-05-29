//frontend/src/store/index.js
// Import necessary functions from Redux to create the store and middleware

import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// Redux Thunk lets us write functions that return functions (to handle async work like fetching from APIs)

import thunk from 'redux-thunk';
// Import the session slice of state

import sessionReducer from './session';
// Import the spots slice of state 

import spotsReducer from './spots';

// Combine all reducers into one big reducer (aka the root reducer)
const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer
});

let enhancer;

// In production (live site), only use thunk middleware (no logging or dev tools)
if (import.meta.env.MODE === 'production') {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import('redux-logger')).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}




// This function sets up and returns the Redux store
const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;


