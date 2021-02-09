import React, { useEffect, useState } from 'react';
import loginBg from '../assets/img/loginBg.png';
// import loginless from './Login.module.less';
import { makeStyles } from '@material-ui/core';
import { TextField, Grid, Typography, Button, Icon, IconButton, CircularProgress } from '@material-ui/core';
import { InputAdornment } from '@material-ui/core';
import Slide from '@/assets/component/Slide'
import common from '@/assets/js/common'
// import axios from 'axios';
import interfaces from '@/interfaces/index';

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
                <Slide in={loginType} timeout={500} unmountOnExit>
                    <SwitchGrid loginType={true} setLoginOrSignin={setLoginOrSignin}/>
                </Slide>
                <Slide in={!loginType} timeout={500} unmountOnExit>
                    <SwitchGrid loginType={false} setLoginOrSignin={setLoginOrSignin}/>
                </Slide>
            </Grid>
        </Grid>
    );
}

const SwitchGrid = props => {
    const loginless = useStyles();
    
    const loginType = props.loginType;

    return (
        <div className={loginless.switchGrid}>
            <Grid item className={loginless.title}><Typography variant="h5" component="h5">{loginType?'登录':'注册'}</Typography></Grid>
            {
                loginType?
                <Grid item className={loginless.formComponent}>
                    <LoginComponent setLoginOrSignin={()=>props.setLoginOrSignin()}/>
                </Grid>
                :
                <Grid item className={loginless.formComponent}>
                    <SigninComponent setLoginOrSignin={()=>props.setLoginOrSignin()}/>
                </Grid>
            }
        </div>
    );
}

const LoginComponent = props => {

    const loginless = useStyles();

    // 显示密码
    const [showPw, setShowPw] = useState(false);

    const refreshSecret = () => {
        let secretHead = common.randomString(5, true);
        let secretFoot = common.randomString(5, true);
        return (secretHead+Date.now()+secretFoot).slice(20);
    }
    const [verifyCodeUrl, setVerifyCodeUrl] = useState('');
    const [getVerifyLoading, setGetVerifyLoading] = useState(false);
    // 获取图片验证码
    const getVerifyCode = async () => {
        // 获取临时Auth存入session
        let tempAuth = refreshSecret();
        sessionStorage.setItem('verifyTempAuth', tempAuth.toString());
        // 请求图片验证码
        setGetVerifyLoading(true);
        let res = await interfaces.getVerifyCode({verifySymbol: 1});
        setGetVerifyLoading(false);
        // 将验证码解密
        if(res && res.data.ErrorCode === 200){
            setVerifyCodeUrl(`data:image/svg+xml;base64,${common.Decrypt(res.data.data.imgData)}`);
        }
    };
    useEffect(() => {
        getVerifyCode();
    },[]);

    // 输入用户名密码验证码
    const [loginParams, setLoginParams] = useState({
        userId: '',
        password: '',
        verifyCode: '',
    });
    const handleChange = (e) => ChangeVal(e, setLoginParams);

    // 登录
    const login = async () => {
        // 混淆加密算法
        common.confusionStr(common.PBKDF2Encrypt("yxk980102"));
        let flag = CheckRequiredAll(loginParams, setErrorInput)
        if(flag){
            let res = await interfaces.login(loginParams);
            console.log(res);
            if(res && res.data.ErrorCode === 200){
                console.log(res);
            }
        }
    };

    // 输入校验
    const [errorInput, setErrorInput] = useState({
        userId: false,
        password: false,
        verifyCode: false,
    });
    const validateInput = (e) => CheckRequiredAll({[e.target.name]:e.target.value}, setErrorInput);

    return (
        <>
            <TextField className={loginless.input} size="small"
                name="userId" required
                label="用户名" variant="outlined" helperText="请输入用户名"
                onChange={handleChange} value={loginParams.userId}
                onBlur={validateInput} error={errorInput.userId}
            />
            <TextField className={loginless.input} size="small"
                name="password" required type={showPw?'text':'password'}
                label="密码" variant="outlined" helperText="请输入密码"
                onChange={handleChange} value={loginParams.password}
                onBlur={validateInput} error={errorInput.password}
                InputProps={{
                    endAdornment: 
                        <InputAdornment position="end">
                            <IconButton onMouseDown={()=>setShowPw(!showPw)} onMouseUp={()=>setShowPw(!showPw)} aria-label="密码展示" edge="end"><Icon>visibility</Icon></IconButton>
                        </InputAdornment>
                }}
            />
            <Grid container item wrap="nowrap">
                <TextField className={loginless.input} size="small"
                    name="verifyCode" required
                    label="验证码" variant="outlined" helperText="请输入验证码"
                    onChange={handleChange} value={loginParams.verifyCode}
                    onBlur={validateInput} error={errorInput.verifyCode}
                />
                <div className={loginless.verifyImg}>
                    <div className={loginless.progressShade} style={{display: getVerifyLoading ? '' : 'none'}}><CircularProgress size={24}/></div>
                    <img src={verifyCodeUrl} onClick={getVerifyCode} alt="验证码"/>
                </div>
            </Grid>
                
            <div className={loginless.smallBtnGroup}>
                <Button onClick={()=>props.setLoginOrSignin()} className={loginless.smallBtnLeft} size="small" color="primary">没有账号?点击注册</Button>
                <Button className={loginless.smallBtnRight} size="small" color="primary">忘了密码</Button>
            </div>
            <Button className={loginless.button} onClick={login} size="large" variant="contained" color="primary">登录</Button>
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
                InputProps={{
                    endAdornment: 
                        <InputAdornment position="end">
                            <IconButton onMouseDown={()=>setShowPw(!showPw)} onMouseUp={()=>setShowPw(!showPw)} aria-label="密码展示" edge="end"><Icon>visibility</Icon></IconButton>
                        </InputAdornment>
                }}
            />
            <TextField className={loginless.input} size="small"
                type={showCheckPw?'text':'password'} label="确认密码" variant="outlined"
                InputProps={{
                    endAdornment: 
                        <InputAdornment position="end">
                            <IconButton onMouseDown={()=>setShowCheckPw(!showCheckPw)} onMouseUp={()=>setShowCheckPw(!showCheckPw)} aria-label="密码展示" edge="end"><Icon>visibility</Icon></IconButton>
                        </InputAdornment>
                    }}
            />
            <TextField className={loginless.input} size="small" label="验证码" variant="outlined" />
            <div className={loginless.smallBtnGroup}>
                <Button onClick={()=>props.setLoginOrSignin()} className={loginless.smallBtnLeft} size="small" color="primary">{'< '}返回</Button>
            </div>
            <Button className={loginless.button} size="large" variant="contained" color="primary">注册</Button>
        </>
    );
};

const ChangeVal = (e, setFunc) => {
    setFunc(prevState => ({...prevState, [e.target.name]: e.target.value}));
};
const CheckRequired = (target, setFunc) => {
    let errorFlag = false;
    if(!target.value){
        errorFlag = true;
    }
    setFunc(prevState => ({...prevState, [target.name]: errorFlag}));
};
const CheckRequiredAll = (obj, setFunc) => {
    let flag = true;
    for(let key in obj){
        if(!obj[key]){
            setFunc(prevState => ({...prevState, [key]: true}));
            flag = false;
        } else setFunc(prevState => ({...prevState, [key]: false}));
    }
    return flag;
};

const useStyles = makeStyles( theme => ({
    contain: {
        backgroundImage: `url(${loginBg})`,
        background: "100% no-repeat",
        backgroundSize: 'cover',
        height: '100vh',
        textAlign: 'center',
        overflow: 'auto',
    },
    switchGrid: {
        width: 'calc(100% - 40px)',
        position: 'absolute',
        padding: '0 20px',
    },
    input: {
        marginTop: '20px',
        width: '100%',
    },
    verifyImg: {
        minWidth: '95px',
        height: '38px',
        margin: '20px 0 0 10px',
        borderRadius: '2px',
        position: 'relative',
        backgroundColor: '#dbd0b1',
        '& img': {
            height: '100%',
        },
    },
    progressShade: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#000',
        opacity: '0.8',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        width: '100%'
    },
    button: {
        marginTop: '16px',
    },
    smallBtnGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '8px',
    },
    form: {
        margin: '5% 0',
        padding: '20px',
        minHeight: '500px',
        maxWidth: '460px',
        backgroundColor: 'rgba(255,255,255,.3)',
        borderRadius: '10px',
        backdropFilter: 'blur(25px) saturate(1.8)',
        overflow: 'hidden',
    },
    formComponent: {
        minHeight: '350px',
    },
}));