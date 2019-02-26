import React, { Component } from 'react';
import PaintingContainer from './paintings/PaintingContainer';
import MuseumPicker from './paintings/MuseumPicker';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="ui grid container">
          <MuseumPicker />
          <PaintingContainer />
        </div>
      </div>
    );
  }
}

export default App;
