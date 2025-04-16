import React, { useState, useCallback } from "react";

import "./SearchBar.css";

const SearchBar = ({ onSearch }) => {
  const [term, setTerm] = useState("");

  const handleTermChange = useCallback((event) => {
    setTerm(event.target.value);
  }, []);

  const search = useCallback(() => {
    if (term.trim()) {
      onSearch(term);
    }
  }, [onSearch, term]);

  return (
    <div className="SearchBar">
      <input
        placeholder="Enter A Song Title"
        value={term}
        onChange={handleTermChange}
      />
      <button className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );
};

export default SearchBar;
