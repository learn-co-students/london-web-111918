import React, { Component } from "react";

class Hog extends Component {
  state = {
    showDetails: false
  };

  render() {
    const { hog } = this.props;

    const weightKey =
      "weight as a ratio of hog to LG - 24.7 Cu. Ft. French Door Refrigerator with Thru-the-Door Ice and Water";
    const medalKey = "highest medal achieved";

    return (
      <div className="ui eight wide column">
        <div className="ui card">
          <div className="image">
            <img
              src={`/hog-imgs/${hog.name
                .toLowerCase()
                .split(" ")
                .join("_")}.jpg`}
              onClick={() =>
                this.setState({ showDetails: !this.state.showDetails })
              }
            />
          </div>
          <div className="content">
            <a className="header">{hog.name}</a>
          </div>
          <div className="extra content">
            <button
              onClick={() =>
                this.setState({ showDetails: !this.state.showDetails })
              }
            >
              {this.state.showDetails ? "Hide Details" : "Show Details"}
            </button>

            {this.state.showDetails && (
              <div>
                <p>Specialty: {hog.specialty}</p>
                <p>Is it greased? {hog.greased}</p>
                <p>{hog[weightKey]}</p>
                <p>{hog[medalKey]}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default Hog;
