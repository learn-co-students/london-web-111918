import React, { Component } from 'react'

class AnalogClock extends Component {
 
  render () {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds / 60) * 360) + 90;
    const mins = now.getMinutes();
    const minsDegrees = ((mins / 60) * 360) + ((seconds/60)*6) + 90;
    const hour = now.getHours();
    const hourDegrees = ((hour / 12) * 360) + ((mins/60)*30) + 90;
 
    return (
      <div className='clock-container'>
        <div className="clock">
          <div className="clock-face">
            <div style={{transform: `rotate(${hourDegrees}deg)`, background: 'darkred'}} className="hand hour-hand"></div>
            <div style={{transform: `rotate(${minsDegrees}deg)`, background: 'darkblue'}} className="hand min-hand"></div>
            <div style={{transform: `rotate(${secondsDegrees}deg)`, background: 'darkgreen'}} className="hand second-hand"></div>
          </div>
        </div>
      </div>
    )
  }
}
 export default AnalogClock
