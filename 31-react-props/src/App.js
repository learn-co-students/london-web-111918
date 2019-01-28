import React, { Component } from 'react'
import paintings from './painting-data' 
import Navbar from './components/Navbar'
import PaintingList from './components/PaintingList'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar
          title="Paintings App"
          subtitle="Collector's edition."
          color="orange"
          icon="painting"
        />
        <PaintingList paintings={paintings} />
      </div>
    )
  }
}

export default App
