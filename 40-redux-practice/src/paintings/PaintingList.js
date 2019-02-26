import React from 'react';
import PaintingListItem from './PaintingListItem';

const PaintingList = ({ paintings }) => {
  const items = paintings.map(pntg => (
    <PaintingListItem key={pntg.id} painting={pntg} />
  ));
  return <div className="ui relaxed divided list scroll">{items}</div>;
};

export default PaintingList;
