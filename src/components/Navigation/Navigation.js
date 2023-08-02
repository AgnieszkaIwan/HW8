import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = ({ isAuthenticated, onLogout }) => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/contacts">Home</Link>
        </li>
        {!isAuthenticated ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <button onClick={onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
