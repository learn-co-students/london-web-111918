import React, { Component } from "react";

class DigitalClock extends Component {
  state = {
    currentTime: "11:00:00"
  };

  componentDidMount() {
    this.timeInterval = window.setInterval(this.updateTime, 1000);
  }

  componentWillUnmount() {
    window.clearInterval(this.timeInterval);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("clock did update");
    console.log("before: ", prevProps, prevState);
    console.log("after: ", this.props, this.state);
  }

  updateTime = () => {
    const time = new Date();
    const timeString = `${time.getHours()} : ${
      time.getMinutes() < 10 ? `0${time.getMinutes()}` : time.getMinutes()
    } : ${
      time.getSeconds() < 10 ? `0${time.getSeconds()}` : time.getSeconds()
    }`;

    this.setState({ currentTime: timeString });
  };

  render() {
    return (
      <div className="app-children">
        <h2 id="digital">{this.state.currentTime}</h2>
      </div>
    );
  }
}

export default DigitalClock;
