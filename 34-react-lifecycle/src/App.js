import React, { Component } from "react";

import RandomKoala from "./components/RandomKoala";
import AnalogClock from "./components/AnalogClock";
import DigitalClock from "./components/DigitalClock";
import StockTicker from "./components/StockTicker";
import WidgetSelector from "./components/WidgetSelector";
import LifeLogger from "./components/LifeLogger";

class App extends Component {
  render() {
    return (
      <div id="app">
        <LifeLogger name="parent" color="red">
          <LifeLogger name="child" color="orange">
            <LifeLogger name="grandchild" color="green" />
          </LifeLogger>
        </LifeLogger>
      </div>
    );
  }
}

export default App;
