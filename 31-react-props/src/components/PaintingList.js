import React from 'react'

import './PaintingList.css'
import Painting from './Painting'

const PaintingList = props =>
  <div className="painting-list">
    {
      props.paintings.map(painting =>
        <Painting painting={painting} />
      )
    }
  </div>

React.createElement('div', null, [])

export default PaintingList
