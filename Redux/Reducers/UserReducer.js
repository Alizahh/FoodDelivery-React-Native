import { combineReducers } from 'redux';
import {
    USER_ORDER,
    USER_LOGGED_IN,
    ADD_USER_DATA,
    CLEAR_ORDER
} from "../types";
const INITIAL_STATE = {
    UserOrder: {},
    userLoggedIn: false,
    userData: {}
};

const UserReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case USER_LOGGED_IN:
            return {
                ...state,
                userLoggedIn: action.payload
            };

        case USER_ORDER:
            return {
                ...state,
                UserOrder: action.payload
            };

        case ADD_USER_DATA:
            return {
                ...state,
                userData: action.payload,
            };
        default:
            return state;

        case CLEAR_ORDER:
            return {
                ...state,
                UserOrder: {},
            };
    }
};

export default UserReducer;
