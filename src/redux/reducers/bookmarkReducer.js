import {
  ADD_BOOKMARK,
  ADD_BOOKMARK_ERROR,
  REMOVE_BOOKMARK,
  REMOVE_BOOKMARK_ERROR,
  FETCH_BOOKMARKS_BY_USER,
  FETCH_BOOKMARKS_BY_USER_ERROR,
} from '../actions/types/actionTypes';
import _ from 'lodash';

const initialState = {
  bookmarksByUser: [],
  addBookmark: [],
  removeBookmark: [],
};

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case FETCH_BOOKMARKS_BY_USER:
      return {
        ...state,
        bookmarksByUser: payload,
      };
    case FETCH_BOOKMARKS_BY_USER_ERROR:
      return {
        ...state,
      };
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarksByUser: [payload, ...state.bookmarksByUser],
      };
    case ADD_BOOKMARK_ERROR:
      return {
        ...state,
      };
    case REMOVE_BOOKMARK:
      const newArr = _.filter(state.bookmarksByUser, (e) => e !== payload);
      return {
        ...state,
        bookmarksByUser: newArr,
      };
    case REMOVE_BOOKMARK_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}
