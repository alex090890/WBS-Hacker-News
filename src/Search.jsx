import React, { useState, useEffect } from "react";
import axios from "axios";
import { Pagination } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    if (searchTerm !== "") {
      fetchNews(searchTerm, currentPage);
    }
  }, [searchTerm, currentPage]);

  const fetchNews = async (query, page) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://hn.algolia.com/api/v1/search?query=${query}&tags=story&page=${page}`,
      );
      setNews(response.data.hits);
      setTotalPages(response.data.nbPages);
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1); // Reset current page when new search is triggered
    fetchNews(searchTerm, 1);
  };

  const handlePaginationClick = (pageNumber) => {
    setCurrentPage(pageNumber);
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
              <a href={article.url} className="newsUrl">
                <h2 className="newsTitle">{article.title}</h2>
              </a>
            </div>
          ))
        ) : (
          news.length === 0 && <div className="process">Type something</div>
        )}
      </div>
      {totalPages > 0 && (
        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePaginationClick(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      )}
    </div>
  );
};

export default Search;
