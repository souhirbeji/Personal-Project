import React from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [cookies, setCookie, removeCookie] = useCookies(['jwt']);
  const navigate = useNavigate();

  const handleLogout = () => {
    // Remove the "jwt" cookie
    removeCookie('jwt');

    // Redirect to the login page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>
      Log out
    </button>
  );
};

export default LogoutButton;
