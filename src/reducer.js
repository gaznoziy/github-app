import { combineReducers } from 'redux';
import userList from './reducers/userList';

export default combineReducers({
  userState: userList
});
