import React from "react";

class Navbar extends React.Component {
  state = {
    search: "",
    artist: ""
  };

  handleSearchChange = e => {
    let search = e.target.value;
    this.props.onSearchChange(search);
  };

  render() {
    return (
      <div className={`ui inverted ${this.props.color} menu`}>
        <a className="item">
          <h2 className="ui header">
            <i className={`${this.props.icon} icon`} />
            <div className="content">{this.props.title}</div>
            <div className="sub header">{this.props.subtitle}</div>
          </h2>
        </a>
        <div class="right menu">
          <a class="ui item" onClick={this.props.onToggleAdvancedSearch}>
            {this.props.showAdvancedSearch
              ? "Simple Search"
              : "Advanced Search"}
          </a>
          {!this.props.showAdvancedSearch && (
            <div class="item">
              <div class="ui icon input">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={this.handleSearchChange}
                />
                <i class="search icon" />
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Navbar;
