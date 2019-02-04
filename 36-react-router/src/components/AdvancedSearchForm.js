import React from "react";

class AdvancedSearchForm extends React.Component {
  state = {
    title: "",
    artist: ""
  };

  handleSubmit = e => {
    e.preventDefault(); // yep, still do this
    this.props.onSearchSubmit(this.state);
  };
  handleChange = e => {
    // do any validation of the form data. e.g.
    // - check if min < max for numerical values
    // - or do fun things with the strings.
    // - what you save in state will be the new value of the input
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <form
        class="ui equal width form"
        onSubmit={this.handleSubmit}
        style={{ padding: "3rem" }}
      >
        <div class="field">
          <label>Title</label>
          <input
            onChange={this.handleChange}
            value={this.state.title}
            type="text"
            name="title"
            placeholder="Title"
          />
        </div>
        <div class="field">
          <label>Author</label>
          <input
            onChange={this.handleChange}
            value={this.state.author}
            type="text"
            name="author"
            placeholder="Author"
          />
        </div>
        <div class="fields">
          <div class="field">
            <label>Minimum Width</label>
            <input
              onChange={this.handleChange}
              value={this.state["min-width"]}
              name="min-width"
              type="number"
              placeholder="in inches"
            />
          </div>
          <div class="field">
            <label>Maximum Width</label>
            <input
              onChange={this.handleChange}
              value={this.state["max-width"]}
              name="max-width"
              type="number"
              placeholder="in inches"
            />
          </div>
        </div>
        <div class="fields">
          <div class="field">
            <label>Minimum Height</label>
            <input
              onChange={this.handleChange}
              value={this.state["min-height"]}
              name="min-height"
              type="number"
              placeholder="in inches"
            />
          </div>
          <div class="field">
            <label>Maximum Height</label>
            <input
              onChange={this.handleChange}
              value={this.state["max-height"]}
              name="max-height"
              type="number"
              placeholder="in inches"
            />
          </div>
        </div>
        <button class="ui button" type="submit">
          Submit
        </button>
      </form>
    );
  }
}

export default AdvancedSearchForm;
