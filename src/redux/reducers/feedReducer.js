import {
  POST_FEED,
  POST_FEED_ERROR,
  GET_FEEDS,
  GET_FEEDS_ERROR,
  ADD_DATA_TO_FEED,
  ADD_DATA_TO_FEED_ERROR,
  ADD_COMMENT,
  ADD_COMMENT_ERROR,
} from '../actions/types/actionTypes';

const initialState = {
  feeds: [],
  feed: null,
  incomingFeed: null,
  loading: true,
  comment: [],
};

export default function (state = initialState, action) {
  const { payload, type } = action;

  switch (type) {
    case POST_FEED:
      return {
        ...state,
        feed: payload,
        loading: false,
      };
    case POST_FEED_ERROR:
      return {
        ...state,
        loading: false,
      };
    case GET_FEEDS:
      return {
        ...state,
        feeds: payload,
        loading: false,
      };
    case GET_FEEDS_ERROR:
      return {
        ...state,
        loading: false,
      };
    case ADD_DATA_TO_FEED:
      return {
        ...state,
        feeds: [payload, ...state.feeds],
        incomingFeed: payload,
        loading: false,
      };
    case ADD_DATA_TO_FEED_ERROR:
      return {
        ...state,
        loading: false,
      };
    case ADD_COMMENT:
      return {
        ...state,
        comment: payload,
      };
    case ADD_COMMENT_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
}
