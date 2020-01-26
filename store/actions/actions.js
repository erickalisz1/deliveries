import { downloadList, FetchDataForUser } from "../../assets/helper/DB";

export const ACTIONS = {
    SET_USER_NAME: "SET_USER_NAME",
    SET_USER_DAYS_LIST: "SET_USER_DAYS_LIST",
    SET_USER_WEEKS_LIST: "SET_USER_WEEKS_LIST",
    SHOULD_REFRESH_SUMMARY: "SHOULD_REFRESH_SUMMARY",
    SET_SQL_LIST: "SET_SQL_LIST",
    IS_OFFLINE: "IS_OFFLINE"
};

//Async actions
export const download = (email, uid, name, list) => {
    return async myRequest => {
        try {
            const dbResult = await downloadList(email, uid, name, list);
            console.log(dbResult);

        } catch (err) {
            console.log(err);
            throw err;
        }
    };
};
export const GetUserList = (email) => {
    return async dispatch => {
        try {
            const result = await FetchDataForUser(email);
            console.log('length of user list:', result.rows.length);

            if (result.rows.length > 0) {
                //only set local list if the result returns rows
                dispatch({
                    type: ACTIONS.SET_SQL_LIST,
                    value: result.rows
                });
            }
            return result;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    };
};