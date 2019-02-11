import React, { Component } from "react";
import { Box, Heading, Form, FormField, Button, Paragraph } from "grommet";
import { Redirect } from "react-router-dom";

class LandingPagePontainer extends Component {
  state = {
    email: null,
    password: null
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = () => {
    this.props.onLogin(this.state);
  };

  render() {
    if (this.props.user) return <Redirect to="/journal" />;

    return (
      <Box
        direction="row"
        align="center"
        justify="center"
        height="100vh"
        background="brand"
      >
        <Box pad="medium" basis="medium" background="white" elevation="medium">
          <Heading size="small" color="brand">
            JournalNow!
          </Heading>
          <Paragraph>Please log in to access your journal</Paragraph>
          <Form onSubmit={this.handleSubmit} onChange={this.handleChange}>
            <FormField name="email" label="Email" />
            <FormField name="password" label="Password" />
            <Button type="submit" primary label="Log in" />
          </Form>
        </Box>
      </Box>
    );
  }
}

export default LandingPagePontainer;
