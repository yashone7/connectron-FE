import {
  ADD_LIKE_ERROR,
  REMOVE_LIKE_ERROR,
  FETCH_LIKES_BY_USER,
  FETCH_LIKES_BY_USER_ERROR,
  ADD_LIKE,
  REMOVE_LIKE,
} from './types/actionTypes';
import { setAlert } from './alertAction';
import _ from 'lodash';
import client from '../../feathers/feathersClient';
const likeService = client.service('like');

export const addLike = (feedId, userId) => async (dispatch) => {
  try {
    const res = await likeService.create({ feed_id: feedId, user_id: userId });
    console.log(res.feed_id);
    dispatch({ type: ADD_LIKE, payload: res.feed_id });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
    dispatch({ type: ADD_LIKE_ERROR });
  }
};

export const removeLike = (feedId, userId) => async (dispatch) => {
  try {
    const res = await likeService.remove(null, {
      query: { feed_id: feedId, user_id: userId, type: 'like' },
    });
    console.log(res.feed_id);
    dispatch({ type: REMOVE_LIKE, payload: res.feed_id });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
    dispatch({ type: REMOVE_LIKE_ERROR });
  }
};

export const fetchLikesByUser = (userId) => async (dispatch) => {
  try {
    const res = await likeService.find({ query: { user_id: userId } });
    const res1 = _.map(res.data, 'feed_id');
    dispatch({ type: FETCH_LIKES_BY_USER, payload: res1 });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
    dispatch({ type: FETCH_LIKES_BY_USER_ERROR });
  }
};
