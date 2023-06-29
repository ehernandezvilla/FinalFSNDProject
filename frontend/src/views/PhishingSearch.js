import React, { useState } from 'react';
import axios from 'axios';
import './PhishingSearch.css';

const PhishingSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [phishingResult, setPhishingResult] = useState([]);
  const [error, setError] = useState(null);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/phishing/search',
        { search_term: searchTerm },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Limitar la cantidad de resultados mostrados a 3
      const limitedResults = response.data.data.slice(0, 3);
      setPhishingResult(limitedResults);
      setError(null);
    } catch (error) {
      setPhishingResult([]);
      setError('Error fetching phishing result: ' + error.message);
    }
  };

  const handleLoadMore = async () => {
    try {
      const response = await axios.post(
        'http://127.0.0.1:5000/phishing/search',
        { search_term: searchTerm },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Obtener los resultados adicionales a partir del cuarto elemento
      const additionalResults = response.data.data.slice(3);
      setPhishingResult((prevResults) => [...prevResults, ...additionalResults]);
      setError(null);
    } catch (error) {
      setError('Error fetching phishing result: ' + error.message);
    }
  };

  return (
    <div className="phishing-search-container">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter domain to search"
        />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {phishingResult.length > 0 && (
        <div className="result-container">
          <h3 className="result-title">Phishing Result:</h3>
          {phishingResult.map((result) => (
            <div key={result.id} className="phishing-item">
              <p>
                <strong>Create Date:</strong> {result.create_date}
              </p>
              <p>
                <strong>Description:</strong> {result.description}
              </p>
              <p>
                <strong>Is Dangerous:</strong> {result.is_dangerous ? 'Yes' : 'No'}
              </p>
              <p>
                <strong>IP Address:</strong> {result.ip}
              </p>
              <p>
                <strong>Phishing URL:</strong> {result.phishing_url}
              </p>
              <p>
                <strong>Submitted by:</strong> {result.submitted_by}
              </p>
            </div>
          ))}
          {phishingResult.length > 3 && (
            <p className="load-more">
              <button onClick={handleLoadMore}>Load More</button>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default PhishingSearch;













