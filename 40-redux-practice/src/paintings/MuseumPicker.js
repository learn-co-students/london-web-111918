import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

const MuseumPicker = ({ selectMuseum, deselectMuseum, filter }) => {
  return (
    <div className="row">
      <div className="ui menu">
        <div
          className={`${filter === '' ? 'active' : ''} item`}
          onClick={deselectMuseum}
        >
          All Museums
        </div>
        <div
          className={`${filter === 'National Gallery of Art, Washington D.C.' ? 'active' : ''} item`}
          onClick={event => selectMuseum(event.target.innerText)}
        >
          National Gallery of Art, Washington D.C.
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  filter: state.filter
})

export default connect(mapStateToProps, actions)(MuseumPicker);
