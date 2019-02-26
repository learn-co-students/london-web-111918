import React from 'react';
import { connect } from 'react-redux';
import { selectPainting } from '../actions';

const PaintingListItem = ({ painting, selectPainting }) => {
  return (
    <div onClick={() => selectPainting(painting.id)} className="ui item">
      <span style={{ cursor: 'pointer' }}>{painting.title}</span>
    </div>
  );
};

// const mapDispatchToProps = dispatch => ({
//   selectPainting: id => dispatch(actions.selectPainting(id)),
//   fetchPaintings: () => dispatch(actions.fetchPaintings())
// })

// actions = {
//   fetchPaintings: f,
//   selectPainting: f
// }

const actionsWeActuallyWant = {
  selectPainting
}

export default connect(null, actionsWeActuallyWant)(PaintingListItem);
