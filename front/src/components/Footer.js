import React from 'react';
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <div className="footer">
      <h2>
        <span className='e'>E</span><span className='phata'>phata</span>
      </h2>
      
      <div className="center">
        <p>&copy;copyright, 2024</p>
      </div>
      <div className="right">
        <h6>Suivez - nous</h6>
        <div className="reseau">
          <img src="/assets/icon_tw.png" alt="twitter" />
          <img src="/assets/icon_ig.png" alt="instagram" />
          <img src="/assets/icon_facebook.png" alt="facebook" />
        </div>
        
      </div>
    </div>
    </>
    );
    
};


export default Footer