import React, { useState } from 'react';
import axios from 'axios';
import './PhishingSearch.css';

const PhishingSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [phishingResult, setPhishingResult] = useState([]);
  const [error, setError] = useState(null);
  const [showLoadMore, setShowLoadMore] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        process.env.REACT_APP_PHISHING_SEARCH_URL,
        { search_term: searchTerm },
        { headers: { 'Content-Type': 'application/json' } }
      );

      const limitedResults = response.data.data.slice(0, 3);
      setPhishingResult(limitedResults);

      if (response.data.count > 3) {
        setShowLoadMore(true);
      } else {
        setShowLoadMore(false);
      }

      setError(null);
      setSearchPerformed(true);
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

      const additionalResults = response.data.data.slice(3);
      setPhishingResult((prevResults) => [...prevResults, ...additionalResults]);

      if (phishingResult.length + additionalResults.length >= response.data.count) {
        setShowLoadMore(false);
      }

      setError(null);
    } catch (error) {
      setError('Error fetching phishing result: ' + error.message);
    }
  };

  return (
    <div className="phishing-search-container">
      <p className="search-message">Do you want to check a suspectful domain? Check here:</p>
      <div className="search-wrapper">
        <form className="search-form" onSubmit={handleSearchSubmit}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Enter domain to search"
          />
          <button type="submit">Search</button>
        </form>
      </div>

      {error && <p className="error-message">{error}</p>}

      {searchPerformed && phishingResult.length > 0 ? (
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
                <strong>Submitted by:</strong> {result.submited_by}
              </p>
            </div>
          ))}
          {showLoadMore && <button className="load-more" onClick={handleLoadMore}>Load More</button>}
        </div>
      ) : searchPerformed && phishingResult.length === 0 ? (
        <p>No se encontraron resultados en la búsqueda.</p>
      ) : null}
    </div>
  );
};

export default PhishingSearch;
















