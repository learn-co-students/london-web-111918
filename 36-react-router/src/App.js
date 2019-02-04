import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import paintings from "./painting-data";
import Navbar from "./components/Navbar";
import PaintingList from "./components/PaintingList";
import PaintingDetails from "./components/PaintingDetails";
import AdvancedSearchForm from "./components/AdvancedSearchForm";

class App extends Component {
  state = {
    searchTerm: "",
    showAdvancedSearch: false,
    paintings: paintings
  };

  addNewPainting = paintingData => {
    let newPaintings = [paintingData, ...this.state.paintings];
    this.setState({ paintings: newPaintings });
  };

  getPaintingById = id => {
    const painting = this.state.paintings.find(painting => painting.id === id);

    return painting
      ? painting
      : {
          error: "painting not found"
        };
  };

  handleSearchChange = searchTerm => {
    /*
      - this function is used by both the simple search in <NavBar> and the <AdvancedSearchForm>
      - to keep it simple, we ignore all the fields from advancedSearhForm and only use the title field.
      - obviously you'd want to implemenbt more complicated search/filter function to use  with the <AdvancedSearchForm>
    */
    const singleSearchTerm = searchTerm.title ? searchTerm.title : searchTerm;
    this.setState(
      {
        searchTerm: singleSearchTerm
      },
      () => {
        this.props.history.push("/paintings");
      }
    );
  };

  filterPaintings = () => {
    if (this.state.searchTerm.length === 0) {
      return paintings;
    } else {
      //filter the paintings
      return paintings.filter(singlePainting => {
        return singlePainting.title
          .toLowerCase()
          .includes(this.state.searchTerm.toLowerCase());
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Navbar
          title="Paintings App"
          subtitle="Collector's edition."
          color="orange"
          icon="paint brush"
          onSearchChange={this.handleSearchChange}
          onToggleAdvancedSearch={this.handleToggleAdvancedSearch}
          showAdvancedSearch={this.state.showAdvancedSearch}
        />

        <Switch>
          <Route
            path="/search"
            component={() => (
              <AdvancedSearchForm onSearchSubmit={this.handleSearchChange} />
            )}
          />

          <Route
            path="/paintings/:paintingId"
            component={({ match }) => (
              <PaintingDetails
                painting={this.getPaintingById(match.params.paintingId)}
              />
            )}
          />

          <Route
            path="/paintings"
            exact
            component={() => (
              <PaintingList paintings={this.filterPaintings()} />
            )}
          />

          <Route component={() => <h2>Page not found</h2>} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
