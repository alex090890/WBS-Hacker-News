import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState([]);

  const fetchNews = async (query) => {
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}&tags=story`,
      );
      setNews(response.data.hits);
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {news.map((article) => (
        <div key={article.objectID} className="newsContainer">
          <h2 className="newsTitle">{article.title}</h2>
          <p className="newsUrl">{article.url}</p>
        </div>
      ))}
    </div>
  );
};

export default Search;
