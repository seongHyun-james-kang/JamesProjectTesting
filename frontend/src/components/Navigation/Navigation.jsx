// Before Phase 5

// import { NavLink } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import ProfileButton from './ProfileButton';
// import OpenModalButton from '../OpenModalButton/OpenModalButton';
// import LoginFormModal from '../LoginFormModal/LoginFormModal';
// import './Navigation.css';


// function Navigation({ isLoaded }) {
//     const sessionUser = useSelector(state => state.session.user);
  
//     const sessionLinks = sessionUser ? (
//       <li>
//         <ProfileButton user={sessionUser} />
//       </li>
//     ) : (
//       <>
//         <li>
//           <OpenModalButton
//             buttonText="Log In"
//             modalComponent={<LoginFormModal />}
//           />
//         </li>
//         <li>
//           <NavLink to="/signup">Sign Up</NavLink>
//         </li>
//       </>
//     );
  
//     return (
//       <ul>
//         <li>
//           <NavLink to="/">Home</NavLink>
//         </li>
//         {isLoaded && sessionLinks}
//       </ul>
//     );
//   }
  
//   export default Navigation;


// After Phase 5

// frontend/src/components/Navigation/Navigation.jsx
import { NavLink } from 'react-router-dom';
import ProfileButton from './ProfileButton'; // this shows the user dropdown
import { useSelector } from 'react-redux';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <nav className="nav-container">
      <div className="nav-left">
        <NavLink to="/" className="logo">JamesBnB</NavLink>
      </div>

      <div className="nav-right">
        {sessionUser && (
          <NavLink to="/spots/new" className="create-spot-button">
            Create a New Spot
          </NavLink>
        )}

        {isLoaded && <ProfileButton user={sessionUser} />}
      </div>
    </nav>
  );
}

export default Navigation;
