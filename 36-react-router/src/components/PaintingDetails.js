import React from "react";
import "./Painting.css";

import { Link } from "react-router-dom";

const PaintingDetails = props =>
  props.painting.error ? (
    <h2>Painting not found, please try again</h2>
  ) : (
    <div className="painting details">
      <Link as="button" to="/paintings">
        Back to List
      </Link>
      <h3>{props.painting.title}</h3>
      <p>{props.painting.artist.name}</p>
      <img src={props.painting.image} />
    </div>
  );

export default PaintingDetails;
