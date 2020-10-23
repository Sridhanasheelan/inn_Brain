import { combineReducers } from 'redux';
import { signUpReducer } from './signup';
import { userReducer } from './userlist';

const rootReducer = combineReducers({
    userReducer, signUpReducer
});

export { rootReducer };