import { ACTIONS } from "../actions/actions";

const initialState = {
    isLoggedIn: false,
    username: '',
    userDaysList: [],
    userWeeksList: [],
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_IS_LOGGED:
            return {
                ...state,
                isLoggedIn: action.value
            };
        case ACTIONS.SET_USER_NAME:
            return {
                ...state,
                username: action.value
            };
        case ACTIONS.SET_USER_DAYS_LIST:
            return {
                ...state,
                userDaysList: action.value
            };
        case ACTIONS.SET_USER_WEEKS_LIST:
            return {
                ...state,
                userWeeksList: action.value
            };
        default:
            return state;
    }
}

/* logout
 const performLogout = () => {
    // clean user data
    dispatch({
      type: SET_USER_DATA,
      value: false
    });
  };
   */