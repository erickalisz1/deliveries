import { combineReducers } from 'redux';
import UserReducer from './reducers/user-reducer';
import DarkModeReducer from './reducers/darkMode-reducer';

const rootReducer = combineReducers({
    user: UserReducer,
    darkMode: DarkModeReducer
});

export default rootReducer;