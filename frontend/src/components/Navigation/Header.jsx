import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Header.css';

function Header( {isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <header className="header-container">
      {/* left is Logo */}
      <div className="header-left">
        <Link to="/" className="logo">JamesBnB</Link>
      </div>

      {/* right is Auth buttons or profile */}
      <div className="header-right">
        {isLoaded && sessionUser && (
          <Link to="/spots/new" className="create-spot-button">
            Create a New Spot
          </Link>
        )}

        {isLoaded && (
          <ProfileButton user={sessionUser} />
        )}
      </div>
    </header>
  );
}

export default Header;
