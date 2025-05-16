import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import './Header.css';

function Header() {
  const sessionUser = useSelector(state => state.session.user);

  return (
    <header className="header-container">
      {/* Left: Logo */}
      <div className="header-left">
        <Link to="/" className="logo">JamesBnB</Link>
      </div>

      {/* Right: Auth buttons or profile */}
      <div className="header-right">
        {sessionUser ? (
          <ProfileButton user={sessionUser} />
        ) : (
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
