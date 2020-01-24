import { ACTIONS } from "../actions/actions";

const initialState = {
    isDarkMode: true
};

export default (state = initialState, action) => {
    switch (action.type) {
        case ACTIONS.SET_IS_DARK_MODE:
            return {
                ...state,
                isDarkMode: action.value
            };
        default:
            return state;
    }
}