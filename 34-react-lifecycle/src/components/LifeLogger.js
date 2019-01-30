import React from "react";

class LifeLogger extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.name, "constructor");
  }

  componentDidMount() {
    console.log(this.props.name, "mounting");
  }

  componentDidUpdate() {
    console.log(this.props.name, "did update");
  }

  render() {
    return (
      <div
        style={{
          color: this.props.color,
          border: `3px solid ${this.props.color}`,
          padding: "2em"
        }}
      >
        {this.props.name}
        <br />
        <br />
        {this.props.children}
      </div>
    );
  }
}

export default LifeLogger;
