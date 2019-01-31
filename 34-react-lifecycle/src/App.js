import React, { Component } from "react";

import RandomKoala from "./components/RandomKoala";
import AnalogClock from "./components/AnalogClock";
import WidgetSelector from "./components/WidgetSelector";
import LifeLogger from "./components/LifeLogger";

class App extends Component {
  render() {
    return (
      <div id="app">
        <WidgetSelector />
      </div>
    );
  }
}

export default App;
