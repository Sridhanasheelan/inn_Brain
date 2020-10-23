import React from 'react';
import { UserDetail } from '../../components/userDetail/index';
import { connect } from 'react-redux';
import { userActions } from '../../action/userAction'
import { isFailed } from '../../helpers/commonMethod';
class userContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            isusernameerror: false,
            usernamehelptext: '',
            email: '',
            isemail: false,
            emailhelptext: '',
            password: '',
            ispassworderror: false,
            passwordheadertext: '',
            uploadFileName: '',
            isShowAddUserModal: false,
            isEditUserData: false,
            uploadImageBase64: '',
            editUserId: ''

        };

    }
    addUserDetails = () => {
        this.setState({
            isShowAddUserModal: true, username: '',
            isusernameerror: false,
            usernamehelptext: '',
            email: '',
            isemail: false,
            emailhelptext: '',
            password: '',
            ispassworderror: false,
            passwordheadertext: '',
            uploadFileName: '',
            isEditUserData: false
        })
    }
    closeUserModal = () => {
        this.setState({
            isShowAddUserModal: false, username: '',
            isusernameerror: false,
            usernamehelptext: '',
            email: '',
            isemail: false,
            emailhelptext: '',
            password: '',
            ispassworderror: false,
            passwordheadertext: '',
            uploadFileName: ''
        })
    }

    componentDidMount = () => {
        const { dispatch } = this.props;
        dispatch(userActions.fetchUserList());
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
                this.setState({ ispassworderror: true, passwordheadertext: 'Invalid password' });

        }
        if (this.state.email.length > 0) {
            if (this.validateEmail(this.state.email))
                this.setState({ isemail: false, emailhelptext: '' });
            else
                this.setState({ isemail: true, emailhelptext: 'Invalid Email id' });

        }
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
    submitAddUserDetail = async (type) => {
        this.validateUserDetails();
        if (!this.state.isusernameerror && !this.state.isemail && !this.state.ispassworderror && this.state.username !== '' && this.state.password !== '' && this.state.email !== '') {
            this.setState({ isShowAddUserModal: false })
            if (this.props.userList !== undefined && type === 'Add') {
                var userNameValidate = this.props.userList.some(item => item.email === this.state.email);
                if (userNameValidate) {
                    var UnableToAddUser = await isFailed('Email id already exist')
                    return
                }
            }
            if (type === 'Add') {
                var data = {
                    name: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    uploadFileName: this.state.uploadFileName,
                    uploadImageBase64: this.state.uploadImageBase64
                }
                const { dispatch } = this.props;
                dispatch(userActions.updateUserData(data, type));
            } else if (type === 'update') {
                var updateData = {
                    id: this.state.editUserId,
                    name: this.state.username,
                    email: this.state.email,
                    password: this.state.password,
                    uploadFileName: this.state.uploadFileName,
                    uploadImageBase64: this.state.uploadImageBase64
                }
                const { dispatch } = this.props;
                dispatch(userActions.updateUserData(updateData, type));
            }
        };

    }
    editUserDetail = (userData) => {
        this.setState({
            isEditUserData: true, isShowAddUserModal: true, username: userData.name,
            isusernameerror: false,
            usernamehelptext: '',
            email: userData.email,
            isemail: false,
            emailhelptext: '',
            password: userData.password,
            ispassworderror: false,
            passwordheadertext: '',
            uploadFileName: userData.uploadFileName,
            editUserId: userData.id
        })
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
    validateUserName = (name) => {
        const re = /^[A-Za-z][a-z0-9]*([._-][a-z0-9]+){0,3}$/;
        return re.test(name);
    }
    validatePassword = (pass) => {
        const re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        return re.test(pass);
    }


    render() {
        const { isShowAddUserModal, username, isusernameerror, usernamehelptext, email, isemail, emailhelptext, password, ispassworderror, passwordheadertext, uploadFileName, isEditUserData } = this.state;
        return (
            <UserDetail
                adduserData={this.addUserDetails}
                isShowAddUserModal={isShowAddUserModal}
                closeUserModal={this.closeUserModal}
                username={username}
                isusernameerror={isusernameerror}
                usernamehelptext={usernamehelptext}
                email={email}
                isemail={isemail}
                emailhelptext={emailhelptext}
                password={password}
                ispassworderror={ispassworderror}
                passwordheadertext={passwordheadertext}
                changed={this.switchNameHandler.bind(this)}
                uploadImage={this.uploadImageChange}
                addUserClick={this.submitAddUserDetail}
                uploadFileName={uploadFileName}
                clickEditIcon={this.editUserDetail}
                isEditUserData={isEditUserData}
                userList={this.props.userList}
                userLength={this.props.userLength}
            // uploadImage={uploadImage}
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

const connectedUserListContainer = connect(mapStateToProps)(userContainer);
export { connectedUserListContainer as userContainer };
