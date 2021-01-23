import {
  ADD_BOOKMARK_ERROR,
  REMOVE_BOOKMARK_ERROR,
  FETCH_BOOKMARKS_BY_USER,
  FETCH_BOOKMARKS_BY_USER_ERROR,
  ADD_BOOKMARK,
  REMOVE_BOOKMARK,
} from './types/actionTypes';
import { setAlert } from './alertAction';
import _ from 'lodash';
import client from '../../feathers/feathersClient';

const bookmarkService = client.service('bookmarks');

export const addBookmark = (feedId, userId) => async (dispatch) => {
  try {
    const res = await bookmarkService.create({
      feed_id: feedId,
      user_id: userId,
    });
    console.log('test');
    console.log(res.feed_id);
    dispatch({ type: ADD_BOOKMARK, payload: res.feed_id });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
    dispatch({ type: ADD_BOOKMARK_ERROR });
  }
};

export const removeBookmark = (feedId, userId) => async (dispatch) => {
  try {
    const res = await bookmarkService.remove(null, {
      query: { feed_id: feedId, user_id: userId, type: 'bookmark' },
    });
    console.log('test');
    console.log(res.feed_id);
    dispatch({ type: REMOVE_BOOKMARK, payload: res.feed_id });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
    dispatch({ type: REMOVE_BOOKMARK_ERROR });
  }
};

export const fetchBookmarksByUser = (userId) => async (dispatch) => {
  try {
    const res = await bookmarkService.find({ query: { user_id: userId } });
    const res1 = _.map(res.data, 'feed_id');
    dispatch({ type: FETCH_BOOKMARKS_BY_USER, payload: res1 });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
    dispatch({ type: FETCH_BOOKMARKS_BY_USER_ERROR });
  }
};
