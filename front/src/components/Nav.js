import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Link } from 'react-router-dom';
import './nav.css';
const Nav = () => {
  return (
    <nav class="navbar">
      <ul className='ul'>
        <li>
          <Link to={"/"}>
            <img className='logo' src="/assets/logo.ico" alt="retour" />
          </Link>
        </li>
        <li>
          <div className='titrenav'>

            <h4>Abscence </h4>
            <h4>employé </h4>
          </div>
        </li>
        <li><Link to={"/"}> Accueil</Link></li>
        <li><Link to={"/employe"}>Liste employe</Link></li>
        <li><Link to={"/absence"}>Absence</Link></li>
        <li><Link to={"/detail"}>Relevé</Link></li>
      </ul>
    </nav>  
  )
}

export default Nav;