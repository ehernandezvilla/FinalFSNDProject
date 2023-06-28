import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Articles.css';

const PlaceholderImage = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="placeholder-image">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8zm3-9h-2V7h-2v4H9v2h4v4h2v-4h4z" />
    </svg>
  );
};

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/articles');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div className="articles-container">
      <h2 className="articles-title">Latest Articles</h2>

      <div className="grid-container">
        {articles.slice(0, 4).map((article) => (
          <div key={article.id} className="article-card">
            {article.image ? (
              <img src={article.image} alt="Article" />
            ) : (
              <div className="placeholder-container">
                <PlaceholderImage />
              </div>
            )}
            <h3>{article.title}</h3>
            <p>{article.create_date}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read More
            </a>
            <p>{article.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Articles;




