import React, { Component } from "react";
import "../App.css";
import Nav from "./Nav";
import HogBrowser from "./HogBrowser";
import HogFilters from "./HogFilters";
import hogs from "../porkers_data";

const weightKey =
  "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water";

class App extends Component {
  state = {
    filters: {
      sortBy: "name",
      greased: false
    }
  };

  handleFilterChange = filterToChange => {
    const newState = {
      filters: {
        ...this.state.filters,
        ...filterToChange
      }
    };
    this.setState(newState);
  };

  filteredAndSortedHogs = () => {
    const filteredHogs = hogs.filter(hog => {
      if (!this.state.filters.greased) {
        return true;
      } else {
        return hog.greased;
      }
    });

    const sortedHogs = filteredHogs.sort((hogOne, hogTwo) => {
      if (this.state.filters.sortBy === "weight") {
        return hogOne[weightKey] - hogTwo[weightKey];
      } else {
        if (hogOne.name < hogTwo.name) {
          return -1;
        }
        if (hogOne.name > hogTwo.name) {
          return 1;
        }
        return 0;
      }
    });

    return sortedHogs;
  };
  render() {
    return (
      <div className="App">
        <Nav />
        <HogFilters onFilterChange={this.handleFilterChange} />
        <HogBrowser hogs={this.filteredAndSortedHogs()} />
      </div>
    );
  }
}

export default App;
