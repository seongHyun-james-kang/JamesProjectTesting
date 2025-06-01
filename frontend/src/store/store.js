// frontend/src/store/store.js

//Import Redux functions
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import {thunk} from 'redux-thunk';

//Import reducers
import logger from 'redux-logger';
import sessionReducer from './session';
import spotsReducer from './spots';

// Combine reducers into rootReducer
const rootReducer = combineReducers({
  session: sessionReducer,
  spots: spotsReducer
});


// Middleware + dev tools setup
// mix of environment check, dynamic import, compose functions, middleware, and Redux DevTools integration
let enhancer; // holds our middleware tools
if (import.meta.env.MODE === 'production') { // this checks whether the app is running in production mode or in development mode
  enhancer = applyMiddleware(thunk); // if production, only apply thunk middleware
} else {
//   const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // this is how we connect Redux DevTools Chrome extension
  enhancer = composeEnhancers(applyMiddleware(thunk, logger)); // we apply thunk + logger middlewares
}

// Create store
// builds the store with rootReducer, enhancer(middleware & devtools)
const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
  };

  export default configureStore;

  