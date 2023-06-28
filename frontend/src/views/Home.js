// src/views/Home.js
import React from "react";
import "./Home.css"; // Importar el archivo CSS local

const Home = () => {
  return (
    <div className="home-container">
      <h1>Home</h1>
      <p>Hey! Welcome to the FSND home project!</p>
      <p>This is a simple CRUD app built with React and Flask.</p>
      <footer className="footer">
        <p>&copy; 2023 ehernandezvilla FSND Project. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
