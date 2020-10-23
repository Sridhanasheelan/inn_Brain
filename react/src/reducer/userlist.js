import { userConstants } from '../helpers/actionConstant';

let userList = JSON.parse(localStorage.getItem('userList'));
const initialState = userList ? { loggedIn: true, userList } : {};

function userReducer(state = initialState, action) {

    switch (action.type) {
        case userConstants.USER_SUCCESS:
            return {
                loggedIn: true,
                userList: action.userList,
                userLength: action.userLength,
            };
        case userConstants.USER_ADDUPADATE:
            return {
                userList: action.userResponse
            };
        case userConstants.USER_FAILURE:
            return {};
        default:
            return state
    }
}

export { userReducer }