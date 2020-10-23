import { PATH } from '../config';
import { apiPost, apiGet } from '../services/userListService';
import { userConstants } from '../helpers/actionConstant';
import { isEmptyObj, isSuccess, isFailed } from '../helpers/commonMethod';
import { history } from "../history/index";

export const signUpActions = {
    fetchUserList,
    updateUserData
};

function updateUserData(userData) {
    return async dispatch => {
        try {
            var apiUrl = PATH.ADD_USER;
            var userResponse = await apiPost(apiUrl, userData);
            let isEmpty = await isEmptyObj(userResponse);
            if (isEmpty === false && userResponse.status === 201)
                var AddUser = await isSuccess('Added user data successfully', 'signUp');
            else
                var UnableToAddUser = await isFailed('Unable to added user data')

        } catch (error) {
            console.log(error);
        }
    }
}
function fetchUserList() {
    return async dispatch => {
        try {
            var apiUrl = PATH.USER_LIST;
            var userResponse = await apiGet(apiUrl);
            let isEmpty = await isEmptyObj(userResponse);
            if (isEmpty === false && userResponse.status === 200) {
                var userData = userResponse.data
                dispatch({ type: userConstants.USER_SUCCESS, userList: userData, userLength: userData.length });
            }
        } catch (error) {
            dispatch({ type: userConstants.USER_FAILURE });
        }
    };
}