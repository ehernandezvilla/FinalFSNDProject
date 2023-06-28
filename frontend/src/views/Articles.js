import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Articles = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/articles');
        setArticles(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchArticles();
  }, []);

  return (
    <div>
      <h2>Latest Articles</h2>
      <div className="articles-container">
        {articles.map((article) => (
          <div className="article" key={article.id}>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              <img src={article.image} alt="Article Thumbnail" />
            </a>
            <div className="article-info">
              <h3>{article.title}</h3>
              <p>{article.create_date}</p>
              <p>{article.description}</p>
            </div>
          </div>
        ))}
      </div>
      <button className="load-more-button">Load More</button>
    </div>
  );
};

export default Articles;
