import React, { useState } from 'react';
import loginBg from '../assets/img/loginBg.jpg';
// import loginless from './Login.module.less';
import { makeStyles } from '@material-ui/core';
import { TextField, Container, Grid, Typography, Button } from '@material-ui/core';

export default function Login (props) {
    const loginless = useStyles();

    // true为登录，false为注册
    const [loginType, setLoginType] = useState(true);

    return (
        <Grid container
            justify="center"
            alignItems="center"
            className={loginless.contain}
        >
            <Grid container item
                justify="center"
                alignItems="flex-start"
                className={loginless.form}
                xs={10} sm={7} md={5} lg={3}
            >
                <Grid item className={loginless.title}><Typography variant="h5" component="h5">{loginType ? '登录' : '注册'}</Typography></Grid>
                <Grid item className={loginless.formComponent} style={{display:loginType?'block':'none',}}>
                    <LoginComponent/>
                </Grid>
                <Grid item className={loginless.formComponent} style={{display:loginType?'none':'block',}}>
                    <SigninComponent/>
                </Grid>
            </Grid>
        </Grid>
    );
}

const LoginComponent = props => {
    const loginless = useStyles();

    return (
        <>
            <TextField className={loginless.input} label="用户名" variant="outlined" />
            <TextField className={loginless.input} label="密码" variant="outlined" />
            <Button className={loginless.button} size="large" variant="contained" color="primary">登录</Button>
        </>
    );
};

const SigninComponent = props => {
    const loginless = useStyles();

    return (
        <>
            <TextField className={loginless.input} label="手机号" variant="outlined" />
            <TextField className={loginless.input} label="用户名" variant="outlined" />
            <TextField className={loginless.input} label="密码" variant="outlined" />
            <TextField className={loginless.input} label="确认密码" variant="outlined" />
            <Button className={loginless.button} size="large" variant="outlined" color="primary">注册</Button>
        </>
    );
};

const useStyles = makeStyles( theme => ({
    contain: {
        backgroundImage: `url(${loginBg})`,
        background: "100% no-repeat",
        backgroundSize: 'cover',
        height: '100vh',
        textAlign: 'center',
    },
    input: {
        marginTop: '20px',
        width: '100%'
    },
    title: {
        width: '100%'
    },
    button: {
        marginTop: '20px',
    },
    form: {
        margin: '10% 0',
        padding: '20px',
        backgroundColor: 'rgba(255,255,255,.4)',
        borderRadius: '10px',
        backdropFilter: 'blur(10px) saturate(1.8)',
    },
    formComponent: {
        minHeight: '350px',
    },
}));