import React from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

class App extends React.Component {
  constructor(props) {
    super();

    this.state = {
      pets: [],
      filters: {
        type: "all"
      }
    };
  }

  handleChangeType = type => {
    this.setState({ filters: { ...this.state.filters, type } });
  };

  handleFindPetsClick = () => {
    const apiURL =
      this.state.filters.type === "all"
        ? "/api/pets"
        : `/api/pets?type=${this.state.filters.type}`;

    fetch(apiURL)
      .then(res => res.json())
      .then(data => this.setState({ pets: data }));
  };

  handleAdoptPet = petId => {
    const newPets = this.state.pets.map(singlePet => {
      if (singlePet.id === petId) {
        //change the pet to be adopted
        singlePet.isAdopted = true;
      }
      return singlePet;
    });

    this.setState({ pets: newPets });
  };

  render() {
    return (
      <div className="ui container">
        <header>
          <h1 className="ui dividing header">React Animal Shelter</h1>
        </header>
        <div className="ui container">
          <div className="ui grid">
            <div className="four wide column">
              <Filters
                onChangeType={this.handleChangeType}
                onFindPetsClick={this.handleFindPetsClick}
              />
            </div>
            <div className="twelve wide column">
              <PetBrowser
                pets={this.state.pets}
                onAdoptPet={this.handleAdoptPet}
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
