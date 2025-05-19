// frontend/src/App.jsx

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom';
import LoginFormPage from './components/LoginFormModal/LoginFormModal';
import * as sessionActions from './store/session';
import SignupFormPage from './components/SignupFormPage/SignupFormPage';

import SpotListPage from './components/SpotListPage/SpotListPage';
import SpotDetailPage from './components/SpotDetailPage/SpotDetailPage';
import Header from './components/Navigation/Header';



// Import SpotFormPage  component
import SpotFormPage from './components/SpotFormPage/SpotFormPage';

function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => {
      setIsLoaded(true)
    });
  }, [dispatch]);

  return (
    <>
    <Header isLoaded={isLoaded} />
    {isLoaded && <Outlet />}
  </>
  );
}

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/', // homepage shows all spots
        element: <SpotListPage />
      },
      {
        path: '/login',
        element: <LoginFormPage />
      },
      {
        path: "/signup",
        element: <SignupFormPage />
      },
      {
        path:"/spots/new", // updated spots route
        element: <SpotFormPage />
      },
      {
        path:"/spots/:spotId", 
        element: <SpotDetailPage />
      },
    ]
  }
]);

function App() {
  return <RouterProvider router={router} />;
}




export default App;