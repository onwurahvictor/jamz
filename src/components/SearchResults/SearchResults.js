// import React from "react";

// import "./SearchResults.css";

// import TrackList from "../TrackList/TrackList";

// const SearchResults = (props) => {
//   return (
//     <div className="SearchResults">
//       <h2>Results</h2>
//       <TrackList tracks={props.searchResults} onAdd={props.onAdd} />
//     </div>
//   );
// };

// export default SearchResults;


import React from "react";
import PropTypes from "prop-types"; // Add PropTypes for validation

import "./SearchResults.css";
import TrackList from "../TrackList/TrackList";

const SearchResults = (props) => {
  return (
    <div className="SearchResults">
      <h2>Results</h2>
      {props.searchResults && props.searchResults.length > 0 ? (
        <TrackList tracks={props.searchResults} onAdd={props.onAdd} />
      ) : (
        <p>No results found</p>
      )}
    </div>
  );
};

// Add PropTypes for validation
SearchResults.propTypes = {
  searchResults: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
};

export default SearchResults;
