import React, { Component } from "react";

import "./PaintingForm.css";

class PaintingForm extends Component {
  state = {
    title: "",
    image: "",
    artist: { name: "" }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.handleAddNewPainting(this.state);
    this.setState({
      title: "",
      image: "",
      artist: { name: "" }
    });
  };

  handlePaintingTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  handlePaintingImageChange = e => {
    this.setState({ image: e.target.value });
  };

  handleArtistNameChange = e => {
    this.setState({ artist: { name: e.target.value } });
  };

  render() {
    return (
      <form id="painting-form" onSubmit={this.handleSubmit}>
        <input
          value={this.state.title}
          onChange={this.handlePaintingTitleChange}
          type="text"
          placeholder="Painting Name"
        />
        <input
          value={this.state.image}
          onChange={this.handlePaintingImageChange}
          type="text"
          placeholder="Painting Image URL"
        />
        <input
          value={this.state.artist.name}
          onChange={this.handleArtistNameChange}
          type="text"
          placeholder="Artist Name"
        />
        <input type="submit" value="Add Painting" />
      </form>
    );
  }
}

export default PaintingForm;
