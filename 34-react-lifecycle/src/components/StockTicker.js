import React, { Component } from "react";

class StockTicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: 0,
      color: "green"
    };
  }

  componentDidMount() {
    this.stockInterval = window.setInterval(this.updateStockPrice, 1000);
  }

  updateStockPrice = () => {
    this.setState({
      price: Math.floor(Math.random() * 100)
    });
  };

  componentDidUpdate(prevProps, prevState) {
    // if the price didn't change (the color changed)
    // then we don't need to recalculate the color
    if (prevState.price === this.state.price) {
      return;
    }

    // if the price has gone up, make the color green
    // if the price has gone down, make it red
    this.setState({
      color: prevState.price > this.state.price ? "red" : "green"
    });
  }

  componentWillUnmount() {
    window.clearInterval(this.stockInterval);
  }

  render() {
    return (
      <div className="app-children">
        <div id="ticker">
          <h2>Flatiron</h2>
          <div style={{ color: this.state.color }}>{this.state.price}</div>
        </div>
      </div>
    );
  }
}

export default StockTicker;
