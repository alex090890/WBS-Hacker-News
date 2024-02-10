import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchNews = async (query) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}&tags=story`,
      );
      setNews(response.data.hits);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(searchTerm);
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="searchForm">
        <input
          className="searchInput"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div className="newsList">
        {loading ? (
          <div className="process">Loading...</div>
        ) : news.length > 0 ? (
          news.map((article) => (
            <div key={article.objectID} className="newsContainer">
              <h2 className="newsTitle">{article.title}</h2>
              <span className="handIcon">&#128073;</span>
              <a href={article.url} className="newsUrl">
                Click Here
              </a>
            </div>
          ))
        ) : (
          news.length === 0 && <div className="process">Type something</div>
        )}
      </div>
    </div>
  );
};

export default Search;
