import React, { Component } from "react";
import { Grommet } from "grommet";
import { Router, Switch, Route } from "react-router-dom";
import { createBrowserHistory } from "history";
import decode from "jwt-decode";

import JournalContainer from "./containers/JournalContainer";
import LandingPageContainer from "./containers/LandingPageContainer";

import "normalize.css";

const theme = {
  global: {
    colors: {
      brand: "#228BE6"
    },
    font: {
      family: "Helvetica, sans-serif",
      size: "16px",
      height: "20px"
    }
  }
};

const history = createBrowserHistory();

class App extends Component {
  constructor(props) {
    super(props);
    const token = window.localStorage.getItem("auth_token");
    const user = token && decode(token).email;
    this.state = {
      auth: {
        user
      }
    };
  }
  handleLogin = credentials => {
    fetch("/api/v1/user_token", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({ auth: credentials })
    })
      .then(res => res.json())
      .then(data => {
        if (data.jwt) {
          // we have a user! verified!
          window.localStorage.setItem("auth_token", data.jwt);
          this.setState({ auth: { user: credentials.email } }, () => {
            history.push("/journal");
          });
        }
      });
  };

  render() {
    return (
      <Router history={history}>
        <Grommet theme={theme}>
          <Switch>
            <Route
              path="/journal"
              render={props => (
                <JournalContainer {...props} user={this.state.auth.user} />
              )}
            />
            <Route
              render={props => (
                <LandingPageContainer
                  {...props}
                  user={this.state.auth.user}
                  onLogin={this.handleLogin}
                />
              )}
            />
          </Switch>
        </Grommet>
      </Router>
    );
  }
}

export default App;
