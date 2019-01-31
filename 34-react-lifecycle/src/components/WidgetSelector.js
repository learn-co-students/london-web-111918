import React, { Component } from "react";
import DigitalClock from "../components/DigitalClock";
import StockTicker from "../components/StockTicker";

class WidgetSelector extends Component {
  state = {
    showClock: true
  };

  render() {
    return (
      <div className="app-children">
        <button
          onClick={() => this.setState({ showClock: !this.state.showClock })}
        >
          Toggle Widget
        </button>
        {this.state.showClock ? <DigitalClock /> : <StockTicker />}
      </div>
    );
  }
}

export default WidgetSelector;
