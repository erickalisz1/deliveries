import { downloadList, FetchDataForUser, ClearUserData } from "../../assets/helper/DB";
import { Alert } from "react-native";

export const ACTIONS = {
    SET_USER_NAME: "SET_USER_NAME",
    SET_USER_DAYS_LIST: "SET_USER_DAYS_LIST",
    SET_USER_WEEKS_LIST: "SET_USER_WEEKS_LIST",
    SHOULD_REFRESH_SUMMARY: "SHOULD_REFRESH_SUMMARY",
    SET_SQL_LIST: "SET_SQL_LIST",
    IS_OFFLINE: "IS_OFFLINE"
};

//Async dispatched actions (all related to SQLite)

export const DownloadListToDevice = (email, uid, name, list) => {
    return async myRequest => {
        try {

            //when user asks to download list, first check if they already have data
            const currentList = await FetchDataForUser(email);

            //if they already had data saved, delete it
            if (currentList.rows.length > 0) {
                //delete user data
                console.log('deleting current list');
                const result = await ClearUserData(email);
                console.log(result);

                //save again but updated
                const dbResult = await downloadList(email, uid, name, list);
                console.log(dbResult);
                return dbResult;
            }

            else { //first time saving to device
                const dbResult = await downloadList(email, uid, name, list);
                console.log(dbResult);
                return dbResult;
            }

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
                    value: result.rows._array
                });
            }
            else {
                Alert.alert('Nothing Found!');
            }
            return result;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    };
};

export const DeleteUserList = email => {
    return async myResult => {
        try {
            const result = await ClearUserData(email);
            console.log(result);
            return result;
        }
        catch (error) {
            console.log(err);
            throw err;
        }
    }
};