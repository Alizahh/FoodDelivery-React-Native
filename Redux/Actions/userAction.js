import {
    USER_ORDER,
    USER_LOGGED_IN,
    ADD_USER_DATA,
    CLEAR_ORDER,
    ORDER_PLACED,
    GOOGLE_SIGNIN
} from "../types";

export const User_Order = order => {
    return async (dispatch) => {
        dispatch({
            type: USER_ORDER,
            payload: order,
        });
    }
};

export const Google_Signin = value => {
    return async (dispatch) => {
        dispatch({
            type: GOOGLE_SIGNIN,
            payload: value,
        });
    }
};
export const Order_PLaced = order => {
    return async (dispatch) => {
        dispatch({
            type: ORDER_PLACED,
            payload: order,
        });
    }
};

export const Clear_User_Order = () => {
    return async (dispatch) => {
        dispatch({
            type: CLEAR_ORDER,
            payload: null,
        });
    }
};


export const User_Log_In = (user) => {
    return async (dispatch) => {
        dispatch({
            type: USER_LOGGED_IN,
            payload: user,
        });
    };
};

export const Add_User_Data = (Data) => {
    return async (dispatch) => {
        dispatch({
            type: ADD_USER_DATA,
            payload: Data,
        });
    };
};