// frontend/src/main.jsx

import React from 'react'; // React is is the library itself
import ReactDOM from 'react-dom/client'; // used to render React components into the DOM
import App from './App';
import './index.css';
import { Provider } from 'react-redux'; // A React component that connects Redux to your React app
import configureStore from './store/store'; // A function that was written before to set up the Redux store
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session'; // 
import { Modal, ModalProvider } from './context/Modal';


const store = configureStore(); // sets up your Redux store(with middleware, reducers)

// if (process.env.NODE_ENV !== 'production') {
//   window.store = store;
// }

// this only runs when you're in development(local machine)
if (import.meta.env.MODE !== 'production') {

  console.log("MODE:", import.meta.env.MODE); // debug
  const { restoreCSRF } = await import("./store/csrf");
  restoreCSRF(); // this sends a GET requests to /api/csrf/restore
  window.csrfFetch = csrfFetch; // attaching window becomes global
  window.store = store;
  window.sessionActions = sessionActions; 
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ModalProvider>
      <Provider store={store}>
        <App />
        <Modal />
      </Provider>
    </ModalProvider>
  </React.StrictMode>
);