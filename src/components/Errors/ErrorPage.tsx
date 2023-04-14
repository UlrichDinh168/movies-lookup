import React from 'react';
import { useNavigate } from 'react-router-dom';

import { setError } from '../../redux/error';

const ErrorPage = ({ clearState, setError }) => {
  const navigate = useNavigate();

  const navigateToHomePage = () => {
    setError({ message: '', statusCode: null });
    clearState();
    navigate('/');
  };

  return (
    <div className="error-page">
      <h1 className="error-header">Oops!</h1>
      <p className="error-msg">Something went wrong.</p>
      <div className="error-link" onClick={() => navigateToHomePage()}>
        <i className="icon-home"></i> Go back to home page.
      </div>
    </div>
  );
};



export default ErrorPage;