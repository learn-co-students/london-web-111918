import React, { Component } from "react";
import styled from "styled-components";
import { Box, Text } from "grommet";
import { Link, Switch, Route, Redirect } from "react-router-dom";

import EntryEditorContainer from "./EntryEditorContainer";

const NavLink = styled(Link)`
  padding: 1em;
  border-bottom: 1px solid rgba(255, 255, 255, 0.5);
  text-decoration: none;
  background: ${props => props.theme.global.colors.brand};

  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

class JournalContainer extends Component {
  state = {
    entries: []
  };

  componentDidMount() {
    fetch("/api/v1/journal_entries", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`
      }
    })
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          this.setState({ entries: data });
        }
      });
  }

  handleJournalSubmit = entry => {
    // if we have an id, we need to change the URL to include it, so we can PATCH the entry
    let apiURL = `/api/v1/journal_entries/${entry.id || ""}`;
    fetch(apiURL, {
      // if we're changing an existing entry, then PATCH
      // otherwise it'll be a POST to create a new entry
      method: entry.id ? "POST" : "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
        "content-type": "application/json"
      },
      body: JSON.stringify(entry)
    })
      .then(res => res.json())
      .then(data => {
        let newStateEntries = this.state.entries.map(oldEntry => {
          return entry.id === oldEntry.id ? entry : oldEntry;
        });

        isNew && newStateEntries.push(data);
        this.setState({ entries: newStateEntries }, () => {
          this.props.history.push(`/journal/${entry.id}`);
        });
      });
  };

  handleJournalDelete = id => {
    let apiURL = `/api/v1/journal_entries/${id}`;
    fetch(apiURL, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`
      }
    }).then(res => {
      if (res.status < 400) {
        let newStateEntries = this.state.entries.filter(oldEntry => {
          return id !== oldEntry.id;
        });

        this.setState({ entries: newStateEntries }, () => {
          this.props.history.push(`/journal/new`);
        });
      } else {
        // handle error
      }
    });
  };

  formatDate = dateString => {
    const date = new Date(dateString);
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December"
    ];
    return `${date.getDate()} ${monthNames[date.getMonth()]}`;
  };
  render() {
    const { entries } = this.state;
    if (!this.props.user) return <Redirect to="/" />;

    return (
      <Box align="stretch" direction="row" height="100vh">
        <Box
          flex="grow"
          basis="1/3"
          background="brand"
          position="relative"
          style={{ overflowY: "scroll", maxWidth: 320 }}
        >
          <NavLink to="/journal/new" style={{ position: "sticky", top: "0" }}>
            <Text weight="bold" color="white">
              New Journal Entry
            </Text>
          </NavLink>

          {entries.map(entry => {
            return (
              <NavLink to={`/journal/${entry.id}`} key={entry.id}>
                <Text weight="bold" color="white">
                  {this.formatDate(entry.created_at)}
                </Text>
                <br />
                <Text size="small" color="white">
                  {entry.note.substring(0, 50)} ...
                </Text>
              </NavLink>
            );
          })}
        </Box>
        <Box
          fill="horizontal"
          pad="medium"
          background="light-1"
          height="100vh"
          direction="column"
          alignContent="stretch"
          align="stretch"
        >
          <Switch>
            {/*
              Route for /journal/new --> render an empty form to  create a new entry
              This is before the route for /journal/:id to because otherwise /new would be interpreted as an id param
              Also note the exact prop on the route
            */}
            <Route
              path="/journal/new"
              exact
              component={() => (
                <EntryEditorContainer onSubmit={this.handleJournalSubmit} />
              )}
            />
            {/* Route for /journal/:id --> edit an existing entry */}
            <Route
              path="/journal/:entryId"
              component={props => {
                return (
                  <EntryEditorContainer
                    {...props}
                    entry={entries.find(
                      entry => entry.id === parseInt(props.match.params.entryId)
                    )}
                    onSubmit={this.handleJournalSubmit}
                    onDelete={this.handleJournalDelete}
                  />
                );
              }}
            />
            {/* Route for /journal --> catchall, on the index just we'll render an empty form to  create a new entry */}
            <Route
              component={() => (
                <EntryEditorContainer onSubmit={this.handleJournalSubmit} />
              )}
            />
          </Switch>
        </Box>
      </Box>
    );
  }
}

export default JournalContainer;
