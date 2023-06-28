import React, { useState } from 'react';
import axios from 'axios';

const PhishingSearch = () => {
  const [domain, setDomain] = useState('');
  const [phishingResult, setPhishingResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`http://127.0.0.1:5000/search/${domain}`);
      setPhishingResult(response.data);
      setError(null);
    } catch (error) {
      setError(error.message);
      setPhishingResult(null);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearchSubmit}>
        <input
          type="text"
          placeholder="Enter domain"
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {phishingResult && (
        <div className="phishing-result-container">
          <h3 className="phishing-result-title">Phishing Result:</h3>
          <div className="phishing-result-details">
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
              <strong>Submitted by:</strong> {phishingResult.submited_by}
            </p>
          </div>
        </div>
      )}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default PhishingSearch;




