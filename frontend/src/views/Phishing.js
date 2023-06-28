import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Phishing.css';

const Phishing = () => {
  const [submissions, setSubmissions] = useState([]);

  useEffect(() => {
    const fetchSubmissions = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/phishing');
        setSubmissions(response.data);
      } catch (error) {
        console.error('Error fetching phishing submissions:', error);
      }
    };

    fetchSubmissions();
  }, []);

  return (
    <div className="phishing-container">
      <h2>Recent Submissions</h2>
      <p>You can help! Sign in or register (free! fast!) to verify these suspected phishes.</p>

      <table className="phishing-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>URL</th>
            <th>Submitted by</th>
          </tr>
        </thead>
        <tbody>
          {submissions.slice(0, 10).map((submission) => (
            <tr key={submission.id}>
              <td>{submission.id}</td>
              <td>
                <a href={submission.phishing_url} target="_blank" rel="noopener noreferrer">
                  {submission.phishing_url}
                </a>
              </td>
              <td>{submission.submited_by}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="see-more">See more suspected phishes...</p>
    </div>
  );
};

export default Phishing;
