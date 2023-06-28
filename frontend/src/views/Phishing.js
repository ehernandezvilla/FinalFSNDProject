import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Phishing.css';

const Phishing = () => {
  const [phishes, setPhishes] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchPhishes = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/phishing');
        setPhishes(response.data);
      } catch (error) {
        console.error('Error fetching phishes:', error);
      }
    };

    fetchPhishes();
  }, []);

  const handleToggleShowAll = () => {
    setShowAll((prevState) => !prevState);
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
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="phishing-container">
      <h2>Recent Submissions</h2>
      {renderPhishes()}
      <button className="toggle-button" onClick={handleToggleShowAll}>
        {showAll ? 'Show Less' : 'See more suspected phishes'}
      </button>
    </div>
  );
};

export default Phishing;

