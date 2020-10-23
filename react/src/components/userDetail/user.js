import React from 'react';
import Grid from '@material-ui/core/Grid';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import style from '../../assets/css/style.css'
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import PersonAddSharpIcon from '@material-ui/icons/PersonAddSharp';
import Container from '@material-ui/core/Container';
import HighlightOffSharpIcon from '@material-ui/icons/HighlightOffSharp';
import { useState, useEffect } from 'react';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import { history } from "../../history/index";

const useStyles = makeStyles((theme) => ({
    editIconCss: {
        cursor: 'pointer'
    },
    userDetailContainer: {
        marginLeft: 50,
        marginRight: 50,
        marginTop: 20
    },
    userDetailHeader: {
        marginLeft: 50,
        marginTop: 20,
        fontWeight: 600
    },
    addUserIcon: {
        position: 'absolute',
        right: 0,
        marginRight: 130,
        marginTop: 10
    },
    logoutIcon:{
        position: 'absolute',
        right: 0,
        marginRight: 60,
        marginTop: 10
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    addUserDetail: {
        fontWeight: 500,
        marginBottom: 30
    },
    input: {
        display: 'none',
    },
    closeIcon: {
        marginLeft: 250,
        marginRight: -20
    },
    avaterIcon: {
        width: 50,
        height: 50,
        backgroundColor: 'white'
    },
    margin: {
        margin: theme.spacing(1),
    },
    errorMsg: {
        color: '#f44336',
        margin: 0,
        fontSize: '0.75rem',
        marginTop: 3,
        textAlign: 'left',
        fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
        fontWeight: 400,
        lineHeight: 1.66,
        letterSpacing: '0.03333em',
    },
    textField: {
        width: '100%',
        marginTop: 20,
        marginLeft: 0
    },
}));

function UserDetail(props) {
    const classes = useStyles();
    const [userListData, setUserListData] = useState([]);
    const [showPassword, setShowPassword] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (type) => {
        if (type === 'logout') {
            history.push('/');
            window.location.reload();
        } else 
            setAnchorEl(null);
    };

    const userImage = (cell, row) => {
        return (

            <div>
                {row.uploadImageBase64 !== '' ?
                    <Avatar alt="Travis Howard" src={`data:image/png;base64,${row.uploadImageBase64}`} />
                    : ''}
            </div>
        )
    }
    const editUserDetail = (cell, row) => {
        return (
            <div>
                <EditIcon className={classes.editIconCss} onClick={() => props.clickEditIcon(row)} />
            </div>
        )
    }
    const renderShowsTotal = (start, to, total) => {
        return (
            <p style={{ color: 'black', marginTop: 34 }}>
                Displaying { start} to { to} of { total}&nbsp;&nbsp;
            </p>
        );
    }
    useEffect(() => {
        setUserListData(props.userList)
    }, [props.userList]);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const options = {
        page: 1,  // which page you want to show as default
        sizePerPageList: [{
            text: '5', value: 5
        }, {
            text: '10', value: 10
        }, {
            text: 'All', value: userListData === undefined ? 0 : userListData.length
        }], // you can change the dropdown list for size per page
        sizePerPage: 10,  // which size per page you want to locate as default
        pageStartIndex: 1, // where to start counting the pages
        paginationSize: 3,  // the pagination bar size.
        prePage: 'Prev', // Previous page button text
        nextPage: 'Next', // Next page button text
        firstPage: 'First', // First page button text
        lastPage: 'Last', // Last page button text
        paginationShowsTotal: renderShowsTotal,
        paginationPosition: 'bottom',  // default is bottom, top and both is all available
        hideSizePerPage: true,
        alwaysShowAllBtns: true,
        withFirstAndLast: false
    };

    return (
        <div>
            <Grid container>
                <Grid item>
                    <div className={classes.userDetailHeader}>User Details</div>
                </Grid>
                <Grid item className={classes.addUserIcon}>
                    <PersonAddSharpIcon onClick={props.adduserData} style={{ width: 35, height: 35, cursor: 'pointer' }} />
                </Grid>
                <Grid item className={classes.logoutIcon}>
                    <PowerSettingsNewIcon aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}  style={{ width: 35, height: 35, cursor: 'pointer' }} />
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClick={() => handleClose('close')}
                    >
                        <MenuItem onClick={() => handleClose('logout')} >Logout</MenuItem>
                    </Menu>
                </Grid>
            </Grid>
            <div className={classes.userDetailContainer}>
                <BootstrapTable data={userListData} striped hover pagination={true} options={options}>
                    <TableHeaderColumn isKey dataField='id' hidden></TableHeaderColumn>
                    <TableHeaderColumn dataField='name'>User Name</TableHeaderColumn>
                    <TableHeaderColumn dataField='email'>Email</TableHeaderColumn>
                    <TableHeaderColumn dataFormat={userImage}>Avatar</TableHeaderColumn>
                    <TableHeaderColumn width="100px" dataFormat={editUserDetail}>Edit</TableHeaderColumn>
                </BootstrapTable>
            </div>
            <div id="myModal" className="modal" style={{ display: props.isShowAddUserModal ? 'block' : 'none' }}>
                <div className="modal-content">
                    <Container component="main" maxWidth="xs">
                        <Grid container>
                            {props.isEditUserData ?
                                <Grid item>
                                    <div className={classes.addUserDetail}>Edit User Detail</div>
                                </Grid> : <Grid item>
                                    <div className={classes.addUserDetail}>Add User Detail</div>
                                </Grid>
                            }
                            <Grid item>
                                <HighlightOffSharpIcon onClick={props.closeUserModal} className={classes.closeIcon} style={{ color: 'grey', width: 35, height: 35, cursor: 'pointer' }} />
                            </Grid>

                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} >
                                <TextField
                                    autoComplete="off"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="username"
                                    value={props.username}
                                    error={props.isusernameerror}
                                    helperText={props.usernamehelptext}
                                    onChange={props.changed}
                                    id="username"
                                    label="Name"
                                />
                            </Grid>
                            <Grid item xs={12} style={{ marginTop: 20 }}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    value={props.email}
                                    error={props.isemail}
                                    helperText={props.emailhelptext}
                                    onChange={props.changed}
                                    autoComplete="off"
                                />
                            </Grid>
                            <Grid item xs={12} >
                                {!props.isEditUserData ?
                                    <React.Fragment>
                                        <FormControl className={clsx(classes.margin, classes.textField)} variant="outlined">
                                            <InputLabel htmlFor="outlined-adornment-password" style={{ color: props.passwordheadertext ? '#f44336' : '' }}>Password</InputLabel>
                                            <OutlinedInput
                                                id="outlined-adornment-password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={props.password}
                                                name="password"
                                                onChange={props.changed}
                                                error={props.ispassworderror}
                                                endAdornment={
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            aria-label="toggle password visibility"
                                                            onClick={handleClickShowPassword}
                                                            onMouseDown={handleMouseDownPassword}
                                                            edge="end"
                                                        >
                                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                }
                                                labelWidth={100}
                                            />
                                        </FormControl>
                                        <div className={classes.errorMsg} style={{ marginLeft: props.passwordheadertext === 'Please enter password' ? -236 : 14 }}>{props.passwordheadertext}</div>
                                    </React.Fragment> :
                                    <TextField
                                        variant="outlined"
                                        required
                                        fullWidth
                                        name="password"
                                        label="Password"
                                        type="password"
                                        id="password"
                                        value={props.password}
                                        error={props.ispassworderror}
                                        helperText={props.passwordheadertext}
                                        onChange={props.changed}
                                        autoComplete="current-password"
                                    />}
                            </Grid>
                            <Grid item xs={5} style={{ marginTop: 20 }}>
                                <input
                                    accept="image/*"
                                    className={classes.input}
                                    id="contained-button-file"
                                    name="uploadImage"
                                    type="file"
                                    onChange={props.uploadImage}
                                />
                                <label htmlFor="contained-button-file">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        className={classes.button}
                                        component="span"
                                        startIcon={<CloudUploadIcon />}
                                    >
                                        Upload
                                    </Button>
                                </label>
                            </Grid>
                            <Grid item xs={6} style={{ marginTop: 26, marginLeft: -36 }}>
                                <div>{props.uploadFileName}</div>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            style={{ marginTop: 40 }}
                            // onClick={props.addUserClick}
                            onClick={() => props.addUserClick(props.isEditUserData ? 'update' : 'Add')}
                        >
                            {props.isEditUserData ? 'Update User' : 'Add User'}

                        </Button>
                        <div id="output"></div>
                    </Container>
                </div>

            </div>
        </div>
    );
}
export { UserDetail }