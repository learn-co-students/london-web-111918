import React from "react";

import "./PaintingList.css";
import Painting from "./Painting";

const PaintingList = props => (
  <div className="painting-list">
    {props.paintings.map(singlePainting => (
      <Painting painting={singlePainting} key={singlePainting.id} />
    ))}
  </div>
);

React.createElement("div", null, []);

export default PaintingList;
