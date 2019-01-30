import React from "react";

import Pet from "./Pet";

const PetBrowser = props => {
  return (
    <div className="ui cards">
      {props.pets.map(singlePet => (
        <Pet
          key={singlePet.id}
          pet={singlePet}
          isAdopted={singlePet.isAdopted}
          onAdoptPet={props.onAdoptPet}
        />
      ))}
    </div>
  );
};

export default PetBrowser;
