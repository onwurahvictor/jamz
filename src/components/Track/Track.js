// import React, { useCallback } from "react";

// import "./Track.css";

// const Track = (props) => {
//   const addTrack = useCallback(
//     (event) => {
//       props.onAdd(props.track);
//     },
//     [props.onAdd, props.track]
//   );

//   const removeTrack = useCallback(
//     (event) => {
//       props.onRemove(props.track);
//     },
//     [props.onRemove, props.track]
//   );

//   const renderAction = () => {
//     if (props.isRemoval) {
//       return (
//         <button className="Track-action" onClick={removeTrack}>
//           -
//         </button>
//       );
//     }
//     return (
//       <button className="Track-action" onClick={addTrack}>
//         +
//       </button>
//     );
//   };

//   return (
//     <div className="Track">
//       <div className="Track-information">
//         <h3>{props.track.name}</h3>
//         <p>
//           {props.track.artist} | {props.track.album}
//         </p>
//       </div>
//       {renderAction()}
//     </div>
//   );
// };

// export default Track;


import React, { useCallback } from "react";
import "./Track.css";

const Track = ({ track, onAdd, onRemove, isRemoval }) => {
  const addTrack = useCallback(() => {
    onAdd(track);
  }, [onAdd, track]);

  const removeTrack = useCallback(() => {
    onRemove(track);
  }, [onRemove, track]);

  const renderAction = () => {
    return isRemoval ? (
      <button className="Track-action" onClick={removeTrack}>
        -
      </button>
    ) : (
      <button className="Track-action" onClick={addTrack}>
        +
      </button>
    );
  };

  return (
    <div className="Track">
      <div className="Track-information">
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {renderAction()}
    </div>
  );
};

export default Track;
