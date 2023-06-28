import React, { useState } from 'react';
import axios from 'axios';
import './PhishingSearch.css';

const PhishingSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [phishingResult, setPhishingResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/phishing/search', { search_term: searchTerm }, { headers: { 'Content-Type': 'application/json' } });
      setPhishingResult(response.data);
      setError(null);
    } catch (error) {
      setPhishingResult(null);
      setError('Error fetching phishing result: ' + error.message);
    }
  };

  return (
    <div className="phishing-search-container">
      <form className="search-form" onSubmit={handleSearchSubmit}>
        <input type="text" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Enter domain to search" />
        <button type="submit">Search</button>
      </form>

      {error && <p className="error-message">{error}</p>}

      {phishingResult && (
        <div className="result-container">
          <h3 className="result-title">Phishing Result:</h3>
          <p>
            <strong>Create Date:</strong> {phishingResult.create_date}
          </p>
          <p>
            <strong>Description:</strong> {phishingResult.description}
          </p>
          <p>
            <strong>Is Dangerous:</strong> {phishingResult.is_dangerous ? 'Yes' : 'No'}
          </p>
          <p>
            <strong>IP Address:</strong> {phishingResult.ip}
          </p>
          <p>
            <strong>Phishing URL:</strong> {phishingResult.phishing_url}
          </p>
          <p>
            <strong>Submitted by:</strong> {phishingResult.submitted_by}
          </p>
        </div>
      )}
    </div>
  );
};

export default PhishingSearch;






