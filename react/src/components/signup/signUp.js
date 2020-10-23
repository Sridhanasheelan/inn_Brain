import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PersonAddTwoToneIcon from '@material-ui/icons/PersonAddTwoTone';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import clsx from 'clsx';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { useState } from 'react';

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                Your Website
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: '#ffffff !important',
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    linkTag: {
        cursor: 'pointer'
    },
    signUpHeader: {
        marginTop: 30,
        marginBottom: 30
    },
    input: {
        display: 'none',
    },
    textField: {
        width: '100%',
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
}));

function SignUp(props) {
    const classes = useStyles();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
      setShowPassword(!showPassword);
    };
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar >
                    <PersonAddTwoToneIcon />
                </Avatar>
                <Typography component="h1" variant="h5" className={classes.signUpHeader}>
                    Sign up
                </Typography>
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
                    <Grid item xs={12}>
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
                    <Grid item xs={12}>
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
                        <div className={classes.errorMsg} style={{marginLeft:14}}>{props.passwordheadertext}</div>
                    </Grid>
                    <Grid item xs={5} >
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
                    <Grid item xs={6} style={{ marginTop: 10, marginLeft: -36 }}>
                        <div>{props.uploadFileName}</div>
                    </Grid>
                </Grid>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={props.signUpClick}
                >
                    Sign Up
                    </Button>
                <Grid container justify="flex-end">
                    <Grid item onClick={props.clickSignUpPage}>
                        <Link variant="body2" className={classes.linkTag}>
                            Already have an account? Sign in
                            </Link>
                    </Grid>
                </Grid>
            </div>
            <Box mt={5}>
                <Copyright />
            </Box>
        </Container>
    );
}
export { SignUp }