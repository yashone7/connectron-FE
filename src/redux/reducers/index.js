import { combineReducers } from 'redux';
import authReducer from './authReducer';
import patientReducer from './patientReducer';
import alertReducer from './alertReducer';
import feedReducer from './feedReducer';
import likeReducer from './likeReducer';
import bookmarkReducer from './bookmarkReducer';

export default combineReducers({
  authReducer,
  patientReducer,
  alertReducer,
  feedReducer,
  likeReducer,
  bookmarkReducer,
});
