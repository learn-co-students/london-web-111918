import React, { Component } from "react";

class RandomKoala extends Component {
  state = {
    koalaURL: ""
  };
  componentDidMount() {
    fetch("http://localhost:3000/koalas")
      .then(res => res.json())
      .then(data => this.setState({ koalaURL: data[0].image_url }));
  }
  render() {
    return (
      <div className="app-children">
        <img src={this.state.koalaURL} />
      </div>
    );
  }
}

export default RandomKoala;
