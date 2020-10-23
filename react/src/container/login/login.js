import React, { Component } from 'react';
import { Login } from '../../components/login/index';
import { connect } from 'react-redux';
import { history } from '../../history/index';
import { userActions } from '../../action/index';
import { isFailed } from '../../helpers/commonMethod';
class loginContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isusernameerror: false,
            usernamehelptext: '',
            ispassworderror: false,
            passwordheadertext: ''
        };

    }
    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(userActions.fetchUserList());
    }

    switchNameHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (this.state.username.length > 0) {
            if (this.validateEmail(this.state.username))
                this.setState({ isusernameerror: false, usernamehelptext: '' });
            else
                this.setState({ isusernameerror: true, usernamehelptext: 'Invalid Email' });
        }
        if (this.state.password.length > 0) {
            if (this.validatePassword(this.state.password))
                this.setState({ ispassworderror: false, passwordheadertext: '' });
            else
                this.setState({ ispassworderror: true, passwordheadertext: 'Password should contain caps and small letter, number , special char, minimum 8 char' });

        }
    }
    moveToSignUpPage = () => {
        history.push('/signup');
        window.location.reload();
    }

    onClickSignIn = async () => {
        this.validateUserDetails();
        if (!this.state.isusernameerror && !this.state.ispassworderror && this.state.username !== '' && this.state.password !== '') {
            if (this.props.userList !== undefined) {
                var EmailId = this.state.username
                var filteredValue = this.props.userList.filter(function (item) {
                    return item.email === EmailId;
                });
                if (filteredValue.length > 0) {
                    if (filteredValue[0].email === this.state.username && filteredValue[0].password === this.state.password) {
                        history.push('/user');
                        window.location.reload();
                    }
                } else {
                    var failedToLogin = await isFailed('Invalid  email id and password')
                }
            }
        }
    }
    validateUserDetails = () => {
        if (this.state.username === '')
            this.setState({ isusernameerror: true, usernamehelptext: 'Please enter Email id' });
        if (this.state.password === '')
            this.setState({ ispassworderror: true, passwordheadertext: 'Please enter password' });
        return
    }
    validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    validatePassword = (pass) => {
        const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return re.test(pass);
    }

    render() {
        const { username, password, isusernameerror, usernamehelptext, ispassworderror, passwordheadertext } = this.state;
        return (
            <Login
                username={username}
                password={password}
                isusernameerror={isusernameerror}
                usernamehelptext={usernamehelptext}
                ispassworderror={ispassworderror}
                passwordheadertext={passwordheadertext}
                changed={this.switchNameHandler.bind(this)}
                clickSignUpPage={this.moveToSignUpPage}
                submitLoginDetail={this.onClickSignIn}

            />
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn, userList, userResponse, userLength } = state.userReducer;
    return {
        loggingIn, userList, userResponse, userLength
    };
}

const connectedLoginContainer = connect(mapStateToProps)(loginContainer);
export { connectedLoginContainer as loginContainer };


