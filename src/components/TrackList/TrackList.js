// import React from "react";

// import "./TrackList.css";

// import Track from "../Track/Track";

// const TrackList = (props) => {
//   return (
//     <div className="TrackList">
//       {props.tracks.map((track) => {
//         return (
//           <Track
//             track={track}
//             key={track.id}
//             onAdd={props.onAdd}
//             isRemoval={props.isRemoval}
//             onRemove={props.onRemove}
//           />
//         );
//       })}
//     </div>
//   );
// };

// export default TrackList;


import React from "react";
import PropTypes from "prop-types"; // Add PropTypes for validation

import "./TrackList.css";
import Track from "../Track/Track";

const TrackList = (props) => {
  return (
    <div className="TrackList">
      {props.tracks.map((track) => (
        <Track
          track={track}
          key={track.id} // Ensure track has a unique 'id'
          onAdd={props.onAdd}
          isRemoval={props.isRemoval}
          onRemove={props.onRemove}
        />
      ))}
    </div>
  );
};

// Add PropTypes for validation
TrackList.propTypes = {
  tracks: PropTypes.array.isRequired,
  onAdd: PropTypes.func.isRequired,
  isRemoval: PropTypes.bool.isRequired,
  onRemove: PropTypes.func.isRequired,
};

export default TrackList;
