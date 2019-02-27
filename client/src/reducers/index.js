import { combineReducers } from 'redux';
import userReducer from './userReducer';
import tasksReducer from './tasksReducer';

export default combineReducers({
   user: userReducer,
   tasks: tasksReducer,
})