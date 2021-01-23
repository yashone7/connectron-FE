import {
  FETCH_LIKES_BY_USER,
  FETCH_LIKES_BY_USER_ERROR,
  ADD_LIKE,
  ADD_LIKE_ERROR,
  REMOVE_LIKE,
} from '../actions/types/actionTypes';
import _ from 'lodash';

const initialState = {
  likesByUser: [],
  addLike: [],
  addUnlike: [],
};

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case FETCH_LIKES_BY_USER:
      return {
        ...state,
        likesByUser: payload,
      };
    case FETCH_LIKES_BY_USER_ERROR:
      return {
        ...state,
      };
    case ADD_LIKE:
      return {
        ...state,
        likesByUser: [payload, ...state.likesByUser],
      };
    case ADD_LIKE_ERROR:
      return {
        ...state,
      };
    case REMOVE_LIKE:
      const newArr = _.filter(state.likesByUser, (e) => e !== payload);
      return {
        ...state,
        likesByUser: newArr,
      };
    default:
      return state;
  }
}
