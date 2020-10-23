import React, { Component } from 'react';
import { SignUp } from '../../components/signup/index';
import { connect } from 'react-redux';
import { history } from "../../history/index";
import { signUpActions } from '../../action/index';
import { isFailed } from '../../helpers/commonMethod';

class signUpContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            email: '',
            password: '',
            isusernameerror: false,
            usernamehelptext: '',
            isemail: false,
            emailhelptext: '',
            ispassworderror: false,
            passwordheadertext: '',
            uploadImageBase64: '',
            uploadFileName: ''
        };

    }

    switchNameHandler = (e) => {
        const { name, value } = e.target;
        this.setState({ [name]: value });
        if (this.state.username.length > 0) {
            if (this.validateUserName(this.state.username))
                this.setState({ isusernameerror: false, usernamehelptext: '' });
            else
                this.setState({ isusernameerror: true, usernamehelptext: 'Invalid username' });
        }
        if (this.state.password.length > 0) {
            if (this.validatePassword(this.state.password))
                this.setState({ ispassworderror: false, passwordheadertext: '' });
            else
                this.setState({ ispassworderror: true, passwordheadertext: 'Password should contain caps and small letter, number , special char, minimum 8 char' });

        }
        if (this.state.email.length > 0) {
            if (this.validateEmail(this.state.email))
                this.setState({ isemail: false, emailhelptext: '' });
            else
                this.setState({ isemail: true, emailhelptext: 'Invalid Email id' });

        }
    }
    componentDidMount=()=>{
        const { dispatch } = this.props;
        dispatch(signUpActions.fetchUserList());
    }
    moveToSignUpPage = () => {
        history.push('/');
        window.location.reload();
    }
    uploadImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = () => {
                const base64Image = reader.result.replaceAll('data:image/png;base64,', '');
                this.setState({ uploadImageBase64: base64Image })
            };
            reader.readAsDataURL(event.target.files[0]);
            this.setState({ uploadFileName: event.target.files[0].name })
        }
    }
    clickSignUp = async () => {
        this.validateUserDetails();
        if (!this.state.isusernameerror && !this.state.isemail && !this.state.ispassworderror && this.state.username !== '' && this.state.password !== '' && this.state.email !== '') {
            const { dispatch } = this.props;
            if (this.props.userList !== undefined) {
                var userNameValidate = this.props.userList.some(item => item.email === this.state.email);
                if (userNameValidate) {
                    var UnableToAddUser = await isFailed('Email id already  exist')
                    return
                }
            }
            var data = {
                name: this.state.username,
                email: this.state.email,
                password: this.state.password,
                uploadFileName: this.state.uploadFileName,
                uploadImageBase64: this.state.uploadImageBase64
            }

            dispatch(signUpActions.updateUserData(data));
        }
    }
    validateUserDetails = () => {
        if (this.state.username === '')
            this.setState({ isusernameerror: true, usernamehelptext: 'Please enter username' });
        if (this.state.email === '')
            this.setState({ isemail: true, emailhelptext: 'Please enter Email id' });
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
    validateUserName = (name) => {
        const re = /^[A-Za-z][a-z0-9]*([._-][a-z0-9]+){0,3}$/;
        return re.test(name);
    }

    render() {
        const { username, password, isemail, email, isusernameerror, usernamehelptext, emailhelptext, ispassworderror, passwordheadertext, uploadFileName } = this.state;
        return (
            <SignUp
                username={username}
                email={email}
                password={password}
                isusernameerror={isusernameerror}
                usernamehelptext={usernamehelptext}
                isemail={isemail}
                emailhelptext={emailhelptext}
                ispassworderror={ispassworderror}
                passwordheadertext={passwordheadertext}
                changed={this.switchNameHandler.bind(this)}
                clickSignUpPage={this.moveToSignUpPage}
                signUpClick={this.clickSignUp}
                uploadImage={this.uploadImageChange}
                uploadFileName={uploadFileName}

            />
        )
    }
}

function mapStateToProps(state) {
    const { loggingIn, userList, userResponse, userLength } = state.signUpReducer;
    return {
        loggingIn, userList, userResponse, userLength
    };
}

const connectedSignUpContainer = connect(mapStateToProps)(signUpContainer);
export { connectedSignUpContainer as signUpContainer };
