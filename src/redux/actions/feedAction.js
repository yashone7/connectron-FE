import {
  POST_FEED,
  POST_FEED_ERROR,
  GET_FEEDS_ERROR,
  GET_FEEDS,
  ADD_DATA_TO_FEED_ERROR,
  ADD_LIKE_ERROR,
  REMOVE_LIKE_ERROR,
} from './types/actionTypes';
import { setAlert } from './alertAction';
import _ from 'lodash';
import client from '../../feathers/feathersClient';

const feedService = client.service('feeds');

/* what is required to post

   data - required blocks, entityMaps
   name - not required
   phone - not required
   address - not required
   id (user_id) - injected during creation
   lat long - required, taken from map component

*/
export const postFeed = ({ id, latitude, longitude, message }) => async (
  dispatch
) => {
  let location = {};
  let coordinates = [];

  coordinates.push(longitude, latitude);
  _.assign(location, {
    type: 'Point',
    coordinates: coordinates,
  });

  const data = JSON.stringify(message);

  try {
    const res = await feedService.create(
      {
        user_id: id,
        location,
        data: data,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    dispatch({
      type: POST_FEED,
      payload: res,
    });

    dispatch(setAlert('message posted successfully', 'success'));
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
    dispatch({ type: POST_FEED_ERROR });
  }
};

export const getFeeds = () => async (dispatch) => {
  try {
    const res = await feedService.find();
    _.reverse(res.data);
    // console.log(res);
    dispatch({ type: GET_FEEDS, payload: res.data });
  } catch (err) {
    dispatch(setAlert(err.message, 'danger'));
    dispatch({ type: GET_FEEDS_ERROR });
  }
};
