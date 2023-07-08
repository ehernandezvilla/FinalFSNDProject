import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Phishing.css';

const Phishing = () => {
  const [phishes, setPhishes] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchPhishes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/phishing', {
          params: { page: currentPage },
        });
        setPhishes(response.data.phishings);
        setTotalPages(Math.ceil(response.data.total_phishings / 10)); // Assuming PHISHING_PER_PAGE = 10
      } catch (error) {
        console.error('Error fetching phishes:', error);
      }
    };

    fetchPhishes();
  }, [currentPage]);

  const handleToggleShowAll = () => {
    if (userLoggedIn) {
      setShowAll((prevState) => !prevState);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const renderPhishes = () => {
    let displayedPhishes = phishes;
    if (!showAll) {
      displayedPhishes = displayedPhishes.slice(0, 10);
    }

    return (
      <table className="phishing-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Submitted by</th>
            <th>IP Address</th>
            <th>Create Date</th>
            <th>Is Dangerous</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {displayedPhishes.map((phish) => (
            <tr key={phish.id}>
              <td>{phish.id}</td>
              <td>
                <a href={phish.phishing_url} target="_blank" rel="noopener noreferrer">
                  {phish.phishing_url}
                </a>
              </td>
              <td>{phish.submited_by}</td>
              <td>{phish.ip}</td>
              <td>{phish.create_date}</td>
              <td>{phish.is_dangerous ? 'Yes' : 'No'}</td>
              <td>{phish.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  useEffect(() => {
    // Verificar si el usuario está autenticado (aquí puedes agregar tu lógica de autenticación)
    const userIsLoggedIn = true; // Ejemplo: el usuario está autenticado
    setUserLoggedIn(userIsLoggedIn);
  }, []);

  return (
    <div className="phishing-container">
      <h2>Recent Submissions</h2>
      {renderPhishes()}
      {!userLoggedIn && (
        <p className="login-message">Debes estar registrado para ver más resultados</p>
      )}
      {userLoggedIn && totalPages > 1 && (
        <div className="pagination-buttons">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            Previous Page
          </button>
          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            Next Page
          </button>
        </div>
      )}
      {userLoggedIn && phishes.length > 15 && (
        <button className="toggle-button" onClick={handleToggleShowAll}>
          {showAll ? 'Show Less' : 'See more suspected phishes'}
        </button>
      )}
    </div>
  );
};

export default Phishing;





