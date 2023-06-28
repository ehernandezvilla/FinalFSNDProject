// src/views/Home.js
import React from 'react';
import logo from '../assets/images/logo.jpg';
import icon1 from '../assets/images/17.-Cloud.svg';
import icon2 from '../assets/images/23.-Going-Online.svg';
import icon3 from '../assets/images/22.-Cyber-Security.svg';
import './Home.css'; // Importamos el archivo de estilos CSS
import Footer from './Footer'; // Importamos el componente Footer
import Articles from './Articles';

const Home = () => {
  return (
    <div className="home-container">
      <div className="logo-container">
        <img src={logo} alt="Logo" className="logo" />
        <p>Hey! Welcome to the FSND home project!</p>
        <p>This is a simple CRUD app built with React and Flask.</p>
      </div> 
      <div className="grid-container">
        <div>
          <img src={icon1} alt="Icon 1" className="icon" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur libero eget arcu rhoncus
            facilisis. Nulla facilisi.
          </p>
        </div>
        <div>
          <img src={icon2} alt="Icon 2" className="icon" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur libero eget arcu rhoncus
            facilisis. Nulla facilisi.
          </p>
        </div>
        <div>
          <img src={icon3} alt="Icon 3" className="icon" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur libero eget arcu rhoncus
            facilisis. Nulla facilisi.
          </p>
        </div>
        <div>
          <img src={icon1} alt="Icon 1" className="icon" />
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur libero eget arcu rhoncus
            facilisis. Nulla facilisi.
          </p>
        </div>
      </div>
      <Articles />
      <Footer />
      
    </div>
  );
};

export default Home;


    

