import React from "react";
import { Link, withRouter } from "react-router-dom";

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
        <Link to="/paintings" className="item">
          <h2 className="ui header">
            <i className={`${this.props.icon} icon`} />
            <div className="content">{this.props.title}</div>
            <div className="sub header">{this.props.subtitle}</div>
          </h2>
        </Link>
        <div class="right menu">
          <Link
            class="ui item"
            to={
              this.props.location.pathname.includes("/search")
                ? "/paintings"
                : "/search"
            }
          >
            {this.props.location.pathname.includes("/search")
              ? "Simple Search"
              : "Advanced Search"}
          </Link>
          {!this.props.location.pathname.includes("/search") && (
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

export default withRouter(Navbar);
