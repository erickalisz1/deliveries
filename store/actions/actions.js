import { downloadList, fetchData } from "../../assets/helper/DB";

export const ACTIONS = {
    SET_USER_NAME: "SET_USER_NAME",
    SET_USER_DAYS_LIST: "SET_USER_DAYS_LIST",
    SET_USER_WEEKS_LIST: "SET_USER_WEEKS_LIST",
    SHOULD_REFRESH_SUMMARY: "SHOULD_REFRESH_SUMMARY",
};

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
export const loadUserList = (fireID) => {
    return async myRequest => {
        try{
            const result = await fetchData(fireID);
            console.log(result);
            return result;
        }
        catch(err){

        }
    };
};