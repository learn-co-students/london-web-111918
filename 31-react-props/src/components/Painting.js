import React from 'react'
import './Painting.css'

const Painting = props =>
  <div className="painting">
    <h3>{props.painting.title}</h3>
    <p>{props.painting.artist.name}</p>
    <img src={props.painting.image} />
  </div>

export default Painting
