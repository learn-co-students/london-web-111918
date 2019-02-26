import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const PaintingShow = ({ painting, deletePainting }) => {
  return (
    <div className="ui card">
      <div className="image">
        <img src={painting.image} alt={painting.slug} />
      </div>
      <div className="content">
        <div className="header">{painting.title}</div>
        <div className="meta">{painting.date}</div>
        <div className="meta">
          {painting.dimensions.width} in. x {painting.dimensions.height} in.
        </div>
        <div className="meta">{painting.museum.name}</div>
        <div className="description">
          by {painting.artist.name}
          <p>
            {painting.artist.birthday} - {painting.artist.deathday}
          </p>
          <p>{painting.artist.hometown}</p>
        </div>
        <div
          className="ui basic red right aligned button"
          onClick={() => deletePainting(painting.id)}
        >
          Delete
        </div>
      </div>
    </div>
  );
};

export default connect(null, actions)(PaintingShow);
