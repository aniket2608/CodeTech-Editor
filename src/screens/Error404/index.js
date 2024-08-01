import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.scss';

const Error404 = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      navigate('/');
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [navigate]);

  return (
    <div className='error-404'>
      <h1>404</h1>
      <p>OPPS! PAGE NOT FOUND</p>
    </div>
  );
};

export default Error404;