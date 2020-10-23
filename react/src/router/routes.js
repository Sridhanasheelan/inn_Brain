import React from 'react';
import { Router, Route } from 'react-router-dom';
import { loginContainer } from "../container/login/login";
import { signUpContainer } from "../container/signup/signup";
import { userContainer } from '../container/users/user'
import { history } from '../history/index';

function Routes() {
    return (
        <Router history={history}>
            <Route path="/" component={loginContainer} exact />
            <Route path="/signup" component={signUpContainer} />
            <Route path="/user" component={userContainer} />
        </Router>
    )
}
export { Routes }




