import React from 'react';
import './SplashScreen.scss'; // Import CSS for animation
import logo from './logo12.png';

const SplashScreen = () => (
  <div className="splash-screen">
    <div className="logo-container">
      <img src={logo} alt="Logo" className="logo" />
      <h1 className="site-name">
        <span className="site">Code</span>
        <span className='name'>Tech</span>
      </h1>
    </div>
  </div>
);

export default SplashScreen;
