// src/components/LoginFormModal/LoginFormModal.jsx

import { useState, useEffect } from 'react';
import * as sessionActions from '../../store/session';
import { useDispatch } from 'react-redux';
import { useModal } from '../../context/Modal'; 
import { restoreCSRF } from '../../store/csrf';

import './LoginForm.css';

function LoginFormModal() {
  const dispatch = useDispatch();
  const { closeModal } = useModal(); 

  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});


  //Reset fields on modal close
  useEffect(() => {
    return () => {
      setCredential('');
      setPassword('');
      setErrors({});
    };
  }, []);


 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
  
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        try {
          const data = await res.json();
          console.log("Login error response:", data);
          if (data?.message) {
            setErrors({ credential: data.message });
          } else {
            setErrors({ credential: "Login failed. Please try again." });
          }
        } catch {
          setErrors({ credential: "An unexpected error occurred." });
        }
      });
  };


  return (
    <>
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Username or Email
          <input 
          value={credential} 
          onChange={(e) => setCredential(e.target.value)} 
          required 
        />

        </label>
        <label>
          Password
          <input 
          type="password" 
          value={password} 
          onChange={(e) => setPassword(e.target.value)} 
          required 
          />
        </label>

        {/*showing backend error messsage */}
        {errors.credential && <p className="error-message">{errors.credential}</p>}
        
        
        {/* disable button for invalid inputs number 10) */}
       {}
        <button 
        type="submit"
        disabled={credential.length < 4 || password.length < 6}
        >
          Log In
        </button>
      {/*Demo user login button number 15 */}
      <button
          type="button"
          onClick={() =>
            dispatch(sessionActions.login({ credential: 'Demo-lition', password: 'password' }))
              .then(closeModal)
          }
        >
          Log in as Demo User
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
