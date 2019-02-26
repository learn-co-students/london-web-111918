import { FETCH_PAINTINGS, SELECT_ACTIVE_PAINTING, DELETE_PAINTING, SELECT_MUSEUM, DESELECT_MUSEUM } from './types';
import artworks from '../data/artworks';

export function fetchPaintings() {
  return { type: FETCH_PAINTINGS, payload: artworks };
}

export function selectPainting(activeID) {
  return { type: SELECT_ACTIVE_PAINTING, id: activeID };
}

export function deletePainting(id) {
  return { type: DELETE_PAINTING, id }
}

export function selectMuseum(newFilter) {
  return { type: SELECT_MUSEUM,  payload: newFilter };
}

export function deselectMuseum() {
  return { type: DESELECT_MUSEUM };
}
