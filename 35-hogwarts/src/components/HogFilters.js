import React from "react";

class HogBrowser extends React.Component {
  handleChange = e => {
    const target = e.target;
    console.log(target.name, target.value, target.checked);

    if (target.name === "sortBy") {
      this.props.onFilterChange({ sortBy: target.value });
    } else {
      this.props.onFilterChange({ greased: target.checked });
    }
  };
  render() {
    return (
      <div className="ui grid container" style={{ padding: "2em" }}>
        Sort by: Name{" "}
        <input
          onChange={this.handleChange}
          type="radio"
          name="sortBy"
          value="name"
        />
        Weight
        <input
          onChange={this.handleChange}
          type="radio"
          name="sortBy"
          value="weight"
        />
        Show Greased Pigs only
        <input onChange={this.handleChange} type="checkbox" name="greased" />
      </div>
    );
  }
}

export default HogBrowser;
