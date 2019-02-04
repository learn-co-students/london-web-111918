import React from "react";
import "./Painting.css";

import { Link } from "react-router-dom";

const Painting = props => (
  <Link as="div" className="painting" to={`/paintings/${props.painting.id}`}>
    <h3>{props.painting.title}</h3>
    <p>{props.painting.artist.name}</p>
    <img src={props.painting.image} />
  </Link>
);

export default Painting;
