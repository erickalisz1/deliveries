import { combineReducers } from 'redux';
import UserReducer from './reducers/user-reducer';

const rootReducer = combineReducers({
    user: UserReducer
});

export default rootReducer;