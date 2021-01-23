import { ADD_COMMENT, ADD_COMMENT_ERROR } from './types/actionTypes';
import { setAlert } from './alertAction';
import _ from 'lodash';
import client from '../../feathers/feathersClient';

const commentService = client.service('comments');

export const postComment = ({ userId, feedId, message }) => async (
  dispatch
) => {
  const data = JSON.stringify(message);

  try {
    const res = await commentService.create(
      {
        user_id: userId,
        feed_id: feedId,
        data: data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res,
    });

    dispatch(setAlert('message posted successfully', 'success'));
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
    dispatch({ type: ADD_COMMENT_ERROR });
  }
};
