import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import "./accueil.css";
const Accueil = () => {
  return (
    <>
    <div  className="containeraccueil">
      <h5 className='titreaccueil'>
        GESTION D'ABSENCE DU PERSONNEL CENTRE EPHATA
      </h5>
      <div className='containerimageaccueil'>
          <div className='containerimage1accueil'>
            <img src='./assets/accueil.webp' alt="image1accueil" /> 
          </div>
          <div className='containerimage2accueil'>
            <img src='./assets/accueil.gif' alt="image2accueil" /> 
          </div>
      </div>
      <div className='slogan'>
        <h5>" Ensemble, nous construisons l'avenir "</h5>
      </div>
    </div>
    

    </>
  )
    
}

export default Accueil