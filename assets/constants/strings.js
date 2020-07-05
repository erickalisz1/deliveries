export const DAYS = "Days";
export const WEEKS = "Weeks";
export const DEL = "Deliveroo";
export const UB = "Uber";
export const HRS = "Hours";
export const TOTAL = "Total";
export const PER = "Per Hour";

export const SPACE = " ";

export const LARGER = ">";
export const LARGER_EQUAL = ">=";
export const SMALLER = "<";
export const SMALLER_EQUAL = "<=";
export const BETWEEN = "><";

export const ROUTES = {
    LOGIN:"Login",
    TABS:"Tabs",
    REGISTER:"Register",
    ACCOUNT:"Account"
};

export const stringVal = (Val) => '$' + Val;//works for all generic values, except per

export const stringPer = (Per) => '$' + Per + '/h';