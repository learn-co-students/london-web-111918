import { combineReducers } from 'redux';
import {
  FETCH_PAINTINGS,
  SELECT_ACTIVE_PAINTING,
  DELETE_PAINTING,
  SELECT_MUSEUM,
  DESELECT_MUSEUM
} from './actions/types';

// state = {
//   paintings: [],
//   activePaintingId: null
// }

const paintingsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_PAINTINGS:
      return [...action.payload];
    case DELETE_PAINTING:
      return state.filter(painting => painting.id !== action.id);
    default:
      return state;
  }
};

const activePaintingIdReducer = (state = null, action) => {
  switch (action.type) {
    case SELECT_ACTIVE_PAINTING:
      return action.id;
    case FETCH_PAINTINGS:
      return action.payload.length > 0 ? action.payload[0].id : null;
    case DELETE_PAINTING:
      return null;
    default:
      return state;
  }
};

const filterReducer = (state = '', action) => {
  switch (action.type) {
    case SELECT_MUSEUM:
      return action.payload;
    case DESELECT_MUSEUM:
      return '';
    default:
      return state
  }
}

const rootReducer = combineReducers({
  paintings: paintingsReducer,
  activePaintingId: activePaintingIdReducer,
  filter: filterReducer
});

// NOTE:
// the keys in the object passed to combineReducers
// will become the top level keys of redux store state
// i.e. store.getState() would return =>
// {
//   paintings: {
//     /* state returned ftom paintingsReducer */
//   },
//   activePainting: {
//     /* state returned from activePaintingReducer */
//   }
// }

export default rootReducer;
