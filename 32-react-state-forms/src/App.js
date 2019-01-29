import React, { Component } from "react";
import paintings from "./painting-data";
import Navbar from "./components/Navbar";
import PaintingList from "./components/PaintingList";
import PaintingDetails from "./components/PaintingDetails";
import AdvancedSearchForm from "./components/AdvancedSearchForm";

class App extends Component {
  state = {
    showDetails: null,
    searchTerm: "",
    showAdvancedSearch: false
  };

  handleShowDetails = singlePainting => {
    this.setState({ showDetails: singlePainting });
  };

  handleSearchChange = searchTerm => {
    /*
      - this funciton is used by both the simple search in <NavBar> and the <AdvancedSearchForm>
      - to keep it simple, we ignore all the fields from advancedSearhForm and only use the title field.
      - obviously you'd want to implemenbt more complicated search/filter function to use  with the <AdvancedSearchForm>
    */
    const singleSearchTerm = searchTerm.title ? searchTerm.title : searchTerm;
    this.setState({
      searchTerm: singleSearchTerm
    });
  };

  handleToggleAdvancedSearch = () => {
    this.setState({
      showAdvancedSearch: !this.state.showAdvancedSearch,
      searchTerm: "" // reset search form  when toggling  between simple and advanced
    });
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

        {/*
            Little extra to demo controlled Forms:
            - <Navbar> has a toggle, that calls handleToggleAdvancedSearch  in this component.
            - advanced search renders big search component <AdvancedSearchForm> and hides the simple search form.
            - onSubmit it'll set state.searchTerm which will trigger a re-render
        */}

        {this.state.showAdvancedSearch && (
          <AdvancedSearchForm onSearchSubmit={this.handleSearchChange} />
        )}

        {/*
            Change what the component renders based on STATE! Show either:
            - the details of the project saved in state.showDetails
            - or show the list of all paintings if we don't have any details (state.showDetails === null)
            - NOTE: the prefix `!this.state.showAdvancedSearch && ` is just to make sure we don't render the AdvancedSearchForm AND the PaintingsList at the same time.
        */}
        {!this.state.showAdvancedSearch && this.state.showDetails ? (
          <PaintingDetails
            painting={this.state.showDetails}
            onShowDetails={this.handleShowDetails}
            searchTerm={this.state.searchTerm}
          />
        ) : (
          <PaintingList
            paintings={this.filterPaintings()}
            onShowDetails={this.handleShowDetails}
          />
        )}
      </div>
    );
  }
}

export default App;
