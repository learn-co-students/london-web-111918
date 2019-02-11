import React, { Component, Fragment } from "react";

import { Box, Form, FormField, TextArea, Button } from "grommet";
import { Trash } from "grommet-icons";

class EntryEditorContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      note: "",
      location: "",
      mood: "",
      ...props.entry
    };
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    this.props.onSubmit(this.state, this.props.isNew);
  };

  handleDelete = () => {
    const youSure = window.confirm(
      `Click OK to delete this ${
        !this.state.id ? "draft" : "journal entry"
      }, this can't be reversed.`
    );
    youSure && !this.state.id
      ? this.setState({
          note: "",
          location: "",
          mood: ""
        })
      : this.props.onDelete(this.props.entry.id);
  };

  render() {
    return (
      <Fragment>
        {this.props.isNew ? (
          <h1>Create a new note</h1>
        ) : (
          <h1>Edit that note</h1>
        )}
        <Form
          style={{ display: "flex", flex: "1 0 auto", flexDirection: "column" }}
          onChange={this.handleChange}
          onSubmit={this.handleSubmit}
          value={this.state}
        >
          <TextArea
            style={{ flex: "1 1 auto" }}
            name="note"
            value={this.state.note}
            onChange={this.handleChange}
            placeholder="What is on your mind today?"
          />
          <FormField name="mood" label="What's your mood today?" />
          <FormField name="location" label="Where are you at right now?" />
          <Box direction="row" gap="small" pad="xsmall" justify="between">
            <Button
              icon={<Trash />}
              a11yTitle={this.props.isNew ? "Discard Draft" : "Delete Entry"}
              onClick={this.handleDelete}
            />
            <Button type="submit" primary label="Submit" />
          </Box>
        </Form>
      </Fragment>
    );
  }
}

export default EntryEditorContainer;
