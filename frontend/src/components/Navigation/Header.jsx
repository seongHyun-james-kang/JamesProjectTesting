import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Header.css';

function Header({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <header className="header-container">
      {/* Left: Logo */}
      <div className="header-left">
        <Link to="/" className="logo">JamesBnB</Link>
      </div>

      {/* Right: Auth buttons or profile */}
      <div className="header-right">
        {isLoaded && sessionUser && (
          <>
            <Link to="/spots/new" className="create-spot-button">
              Create a New Spot
            </Link>
            <ProfileButton user={sessionUser} />
          </>
        )}

        {isLoaded && !sessionUser && (
          <>
            <button className="auth-button">Log in</button>
            <button className="auth-button">Sign up</button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
