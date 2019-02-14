import React, { Component } from "react";
import "./App.css";

import { createStore } from "redux";

const reducer = (oldState = { count: 0 }, action) => {
  switch (action.type) {
    case "INCREMENT_COUNTER":
      return { ...oldState, count: oldState.count + 1 };
    case "DECREMENT_COUNTER":
      return { ...oldState, count: oldState.count - 1 };
    default:
      return oldState;
  }
};

const store = createStore(reducer);

class App extends Component {
  componentDidMount() {
    store.subscribe(() => this.forceUpdate());
  }

  increment = () => {
    store.dispatch({ type: "INCREMENT_COUNTER" });
  };

  decrement = () => {
    store.dispatch({ type: "DECREMENT_COUNTER" });
  };

  render() {
    return (
      <div className="App">
        <Header count={store.getState().count} />
        <Counter
          count={store.getState().count}
          increment={this.increment}
          decrement={this.decrement}
        />
      </div>
    );
  }
}

class Header extends Component {
  renderDescription = () => {
    const remainder = this.props.count % 5;
    const upToNext = 5 - remainder;
    return `The current count is less than ${this.props.count + upToNext}`;
  };

  render() {
    return (
      <header className="App-header">
        <h1 className="App-title">The big redux counter</h1>
        <h3>{this.renderDescription()}</h3>
      </header>
    );
  }
}

class Counter extends Component {
  render() {
    return (
      <div className="Counter">
        <h1>{this.props.count}</h1>
        <button onClick={this.props.decrement}> - </button>
        <button onClick={this.props.increment}> + </button>
      </div>
    );
  }
}

export default App;
