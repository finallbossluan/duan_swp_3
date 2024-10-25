import React from 'react';
import { Link } from 'react-router-dom';

const Setting = ({ userData }) => {
  return (
    <Link
      to="/change-password"
      state={{ userData }} // Passing the user data through state
      className="btn btn-primary"
    >
      Change Password
    </Link>
  );
};

export default Setting;
