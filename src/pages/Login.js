import React, { useState } from 'react';
import loginBg from '../assets/img/loginBg.jpg';
// import loginless from './Login.module.less';
import { makeStyles } from '@material-ui/core';
import { TextField, Container, Grid, Typography, Button, Icon, IconButton } from '@material-ui/core';
import { FormControl, InputLabel, OutlinedInput, InputAdornment } from '@material-ui/core';
import { Fade } from '@material-ui/core';

export default function Login (props) {
    const loginless = useStyles();

    // true为登录，false为注册
    const [loginType, setLoginType] = useState(true);
    const setLoginOrSignin = (val) => {
        setLoginType(!loginType);
    };

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
                <Fade in={loginType}>
                    <Grid item className={loginless.title} style={{display:loginType?'block':'none',}}><Typography variant="h5" component="h5">登录</Typography></Grid>
                </Fade>
                <Fade in={!loginType}>
                    <Grid item className={loginless.title} style={{display:loginType?'none':'block',}}><Typography variant="h5" component="h5">注册</Typography></Grid>
                </Fade>
                <Fade in={loginType}>
                    <Grid item className={loginless.formComponent} style={{display:loginType?'block':'none',}}>
                        <LoginComponent setLoginOrSignin={setLoginOrSignin}/>
                    </Grid>
                </Fade>
                <Fade in={!loginType}>
                    <Grid item className={loginless.formComponent} style={{display:loginType?'none':'block',}}>
                        <SigninComponent setLoginOrSignin={setLoginOrSignin}/>
                    </Grid>
                </Fade>
            </Grid>
        </Grid>
    );
}

const LoginComponent = props => {
    const loginless = useStyles();

    const [showPw, setShowPw] = useState(false);

    const [loginParams, setLoginParams] = useState({
        userId: '',
        password: '',
        verifyCode: '',
    });
    const handleChange = (e) => {
        setLoginParams(prevState => ({...prevState, [e.target.name]: e.target.value}));
    };

    return (
        <>
            <TextField className={loginless.input} size="small"
                name="userId" required
                label="用户名" variant="outlined" defaultValue={loginParams.userId}
                onChange={(e) => handleChange(e)}
            />
            <TextField className={loginless.input} size="small"
                name="password" required
                type={showPw?'text':'password'} label="密码" variant="outlined" value={loginParams.password}
                onChange={(e) => handleChange(e)}
                InputProps={
                    {
                        endAdornment: 
                            <InputAdornment position="end">
                                <IconButton onMouseDown={()=>setShowPw(!showPw)} onMouseUp={()=>setShowPw(!showPw)} aria-label="密码展示" edge="end"><Icon>visibility</Icon></IconButton>
                            </InputAdornment>
                    }
                }
            />
            <TextField className={loginless.input} size="small"
                name="verifyCode" required
                label="验证码" variant="outlined" value={loginParams.verifyCode}
                onChange={(e) => handleChange(e)}
            />
            <div className={loginless.smallBtnGroup}>
                <Button onClick={()=>props.setLoginOrSignin()} className={loginless.smallBtnLeft} size="small" color="primary">没有账号?点击注册</Button>
                <Button className={loginless.smallBtnRight} size="small" color="primary">忘了密码</Button>
            </div>
            <Button className={loginless.button} size="large" variant="contained" color="primary">登录</Button>
        </>
    );
};

const SigninComponent = props => {
    const loginless = useStyles();

    const [showPw, setShowPw] = useState(false);
    const [showCheckPw, setShowCheckPw] = useState(false);

    return (
        <>
            <TextField className={loginless.input} size="small" label="手机号" variant="outlined" />
            <TextField className={loginless.input} size="small" label="用户名" variant="outlined" />
            <TextField className={loginless.input} size="small"
                type={showPw?'text':'password'} label="密码" variant="outlined"
                InputProps={
                    {
                        endAdornment: 
                            <InputAdornment position="end">
                                <IconButton onMouseDown={()=>setShowPw(!showPw)} onMouseUp={()=>setShowPw(!showPw)} aria-label="密码展示" edge="end"><Icon>visibility</Icon></IconButton>
                            </InputAdornment>
                    }
                }
            />
            <TextField className={loginless.input} size="small"
                type={showCheckPw?'text':'password'} label="确认密码" variant="outlined"
                InputProps={
                    {
                        endAdornment: 
                            <InputAdornment position="end">
                                <IconButton onMouseDown={()=>setShowCheckPw(!showCheckPw)} onMouseUp={()=>setShowCheckPw(!showCheckPw)} aria-label="密码展示" edge="end"><Icon>visibility</Icon></IconButton>
                            </InputAdornment>
                    }
                }
            />
            <TextField className={loginless.input} size="small" label="验证码" variant="outlined" />
            <div className={loginless.smallBtnGroup}>
                <Button onClick={()=>props.setLoginOrSignin()} className={loginless.smallBtnLeft} size="small" color="primary">{'< '}返回</Button>
            </div>
            <Button className={loginless.button} size="large" variant="contained" color="primary">注册</Button>
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
    smallBtnGroup: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    smallBtnLeft: {
        // justifySelf: 'flex-start',
    },
    smallBtnRight: {
        // justifySelf: 'flex-end',
    },
    form: {
        margin: '10% 0',
        padding: '20px',
        minHeight: '400px',
        maxWidth: '460px',
        backgroundColor: 'rgba(255,255,255,.4)',
        borderRadius: '10px',
        backdropFilter: 'blur(10px) saturate(1.8)',
    },
    formComponent: {
        minHeight: '350px',
    },
}));