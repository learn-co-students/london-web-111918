import React from "react";
import Hog from "./Hog";

const HogBrowser = props => {
  return (
    <div className="ui grid container">
      {props.hogs.map(singleHog => (
        <Hog hog={singleHog} />
      ))}
    </div>
  );
};

export default HogBrowser;
