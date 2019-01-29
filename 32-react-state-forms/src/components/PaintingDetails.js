import React from "react";
import "./Painting.css";

const PaintingDetails = props => (
  <div className="painting details">
    <button
      onClick={() => {
        props.onShowDetails(null);
      }}
    >
      Back to List
    </button>
    <h3>{props.painting.title}</h3>
    <p>{props.painting.artist.name}</p>
    <img src={props.painting.image} />
  </div>
);

export default PaintingDetails;
