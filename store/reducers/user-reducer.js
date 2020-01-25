import { ACTIONS } from "../actions/actions";

const initialState = {
    username: '',
    userDaysList: [],
    userWeeksList: [],
    shouldRefresh: false
};

export default (state = initialState, action) => {
    switch (action.type) {
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
        case ACTIONS.SHOULD_REFRESH_SUMMARY:
            return {
                ...state,
                shouldRefresh: action.value
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