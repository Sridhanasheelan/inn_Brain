import { PATH } from '../config';
import { apiPost, apiGet, apiPut } from '../services/userListService';
import { userConstants } from '../helpers/actionConstant';
import { isEmptyObj, isSuccess, isFailed } from '../helpers/commonMethod';

export const userActions = {
    fetchUserList,
    updateUserData
};

function updateUserData(userData, type) {
    return async dispatch => {
        try {
            if (type === 'Add') {
                var apiUrl = PATH.ADD_USER;
                var userResponse = await apiPost(apiUrl, userData);
                let isEmpty = await isEmptyObj(userResponse);
                if (isEmpty === false && userResponse.status === 201) {
                    var AddUser = await isSuccess('Added user data successfully');
                    var apiUrl = PATH.USER_LIST;
                    var userResponse = await apiGet(apiUrl);
                    let isEmpty = await isEmptyObj(userResponse);
                    if (isEmpty === false && userResponse.status === 200) {
                        var getUserData = userResponse.data
                        dispatch({ type: userConstants.USER_SUCCESS, userList: getUserData, userLength: getUserData.length });
                    }
                }
                else
                    var UnableToAddUser = await isFailed('Unable to added user data')

            } else if (type === 'update') {
                var apiUrl = PATH.UPDATE_USER;
                var userResponse = await apiPut(apiUrl, userData);
                let isEmpty = await isEmptyObj(userResponse);
                if (isEmpty === false && userResponse.status === 202) {
                    var updateUser = await isSuccess('updated user data successfully');
                    var apiUrl = PATH.USER_LIST;
                    var userResponse = await apiGet(apiUrl);
                    let isEmpty = await isEmptyObj(userResponse);
                    if (isEmpty === false && userResponse.status === 200) {
                        var getUserData = userResponse.data
                        dispatch({ type: userConstants.USER_SUCCESS, userList: getUserData, userLength: getUserData.length });
                    }
                }
                else
                    var UnableToUpdateUser = await isFailed('Unable to update user data')
            }


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