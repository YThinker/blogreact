import React, { useEffect, useState, createContext, useContext, useRef } from 'react';

import { makeStyles } from '@material-ui/core';
import { TextField, Grid, Typography, Button, Icon, IconButton, Tooltip, CircularProgress } from '@material-ui/core';
import { InputAdornment, Collapse } from '@material-ui/core';
import { Slide, alert } from '@/assets/component'

import common from '@/assets/js/common'
import interfaces from '@/interfaces/index';

import store from '@/store/index';

import loginBg from '../assets/img/loginBg.png';

const LoginTypeContext = createContext();

export default function Login (props) {
    const loginless = useStyles();

    // 1为登录，2为注册, 3为忘记密码
    const [loginType, setLoginType] = useState(1);

    console.log(loginType);

    return (
        <LoginTypeContext.Provider value={[loginType, setLoginType]}>
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
                    <Slide in={loginType===1} timeout={500} unmountOnExit>
                        <SwitchGrid loginType={1}/>
                    </Slide>
                    <Slide in={loginType===2} timeout={500} unmountOnExit>
                        <SwitchGrid loginType={2}/>
                    </Slide>
                    <Slide in={loginType===3} timeout={500} unmountOnExit>
                        <SwitchGrid loginType={3}/>
                    </Slide>
                </Grid>
            </Grid>
        </LoginTypeContext.Provider>
    )
}

const SwitchGrid = props => {
    const loginless = useStyles();
    
    const loginType = props.loginType;

    return (
        <div className={loginless.switchGrid}>
            <Grid item className={loginless.title}><Typography variant="h5" component="h5">{loginType===1?'登录':loginType===2?'注册':'忘记密码'}</Typography></Grid>
            {
                loginType===1?
                <Grid item className={loginless.formComponent}>
                    <LoginComponent/>
                </Grid>
                :loginType===2?
                <Grid item className={loginless.formComponent}>
                    <RegisterComponent/>
                </Grid>
                :
                <Grid item className={loginless.formComponent}>
                    <ForgetPwdComponent/>
                </Grid>
            }
        </div>
    );
}

const LoginComponent = props => {
    const loginless = useStyles();

    // 显示密码
    const [showPw, setShowPw] = useState(false);

    const [loginType, setLoginType] = useContext(LoginTypeContext);

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
        let res = await interfaces.getVerifyCode({verifySymbol: 1, verifyType: 'mathExpr'});
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
        let flag = CheckRequiredAll(loginParams, setErrorInput)
        if(flag){
            // 混淆加密算法
            let pwd = common.confusionStr(common.PBKDF2Encrypt(loginParams.password));
            const params = {...loginParams, password: pwd,}
            let res = await interfaces.login(params);
            console.log(res);
            if(res && res.data.ErrorCode === 200){
                localStorage.setItem('token', res.data.data.token);
                store.dispatch({type: 'SET_TOKEN', token: res.data.data.token});
                store.dispatch({type: 'SET_USERINFO', userInfoSecurity: res.data.data.userInfoSecurity});
                window._reacthistory.push('/index');
            } else {
                getVerifyCode();
            }
        }
    };

    // 输入校验
    const [errorInput, setErrorInput] = useState({
        userId: false,
        userIdHelperText: '请输入用户名',
        password: false,
        passwordHelperText: '请输入密码',
        verifyCode: false,
        verifyCodeHelperText: '请输入验证码',
    });
    const validateInput = (e) => CheckRequiredAll({[e.target.name]:e.target.value}, setErrorInput);

    return (
        <>
            <TextField className={loginless.input} size="small"
                name="userId" required
                label="用户名" variant="outlined" helperText={errorInput.userIdHelperText}
                onChange={handleChange} value={loginParams.userId}
                onBlur={validateInput} error={errorInput.userId}
            />
            <TextField className={loginless.input} size="small"
                name="password" required type={showPw?'text':'password'}
                label="密码" variant="outlined" helperText={errorInput.passwordHelperText}
                onChange={handleChange} value={loginParams.password}
                onBlur={validateInput} error={errorInput.password}
                InputProps={{
                    endAdornment: 
                        <InputAdornment position="end">
                            <IconButton className={loginless.iconButton} onTouchStart={()=>setShowPw(!showPw)} onMouseDown={()=>setShowPw(!showPw)} onTouchEnd={()=>setShowPw(!showPw)} onMouseUp={()=>setShowPw(!showPw)} aria-label="密码展示" edge="end"><Icon className={loginless.icon}>visibility</Icon></IconButton>
                        </InputAdornment>
                }}
            />
            <Grid container item wrap="nowrap">
                <TextField className={loginless.input} size="small"
                    name="verifyCode" required
                    label="验证码" variant="outlined" helperText={errorInput.verifyCodeHelperText}
                    onChange={handleChange} value={loginParams.verifyCode}
                    onBlur={validateInput} error={errorInput.verifyCode}
                />
                <div className={loginless.verifyImg}>
                    <div className={loginless.progressShade} style={{display: getVerifyLoading ? '' : 'none'}}><CircularProgress size={24}/></div>
                    <img src={verifyCodeUrl} onClick={getVerifyCode} alt="验证码"/>
                </div>
            </Grid>
                
            <div className={loginless.smallBtnGroup}>
                <Button onClick={()=>setLoginType(2)} className={loginless.smallBtnLeft} size="small" color="primary">没有账号?点击注册</Button>
                <Button onClick={()=>setLoginType(3)} className={loginless.smallBtnRight} size="small" color="primary">忘了密码</Button>
            </div>
            <Button className={loginless.button} onClick={login} size="large" variant="contained" color="primary">登录</Button>
        </>
    );
};

const RegisterComponent = props => {
    const loginless = useStyles();

    const [loginType, setLoginType] = useContext(LoginTypeContext);

    const [showPw, setShowPw] = useState(false);
    const [showCheckPw, setShowCheckPw] = useState(false);

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
        let res = await interfaces.getVerifyCode({verifySymbol: 2});
        setGetVerifyLoading(false);
        // 将验证码解密
        if(res && res.data.ErrorCode === 200){
            setVerifyCodeUrl(`data:image/svg+xml;base64,${common.Decrypt(res.data.data.imgData)}`);
        }
    };
    useEffect(() => {
        getVerifyCode();
    },[]);

    const [registerParams, setRegisterParams] = useState({
        userId: '',
        nickName: '',
        password: '',
        repeatPwd: '',
        verifyCode: '',
        question: '',
        answer: '',
    });
    const handleChange = (e) => ChangeVal(e, setRegisterParams);
    const register = async () => {
        let flag = CheckRequiredAll(registerParams, setErrorInput)
        if(flag) {
            let {repeatPwd, ...params} = registerParams;
            params.password = common.confusionStr(common.PBKDF2Encrypt(registerParams.password));
            params.answer = common.confusionStr(common.PBKDF2Encrypt(registerParams.answer));
            console.log('registerParams:',params);
            let res = await interfaces.register(params);
            console.log(res);
            if(res && res.data.ErrorCode === 200){
                localStorage.setItem('token', res.data.data.token);
                store.dispatch({type: 'SET_TOKEN', token: res.data.data.token});
                store.dispatch({type: 'SET_USERINFO', userInfoSecurity: res.data.data.userInfoSecurity});
                window._reacthistory.push('/index');
            }
        }
    };

    const [errorInput, setErrorInput] = useState({
        userId: false,
        userIdHelperText: '请输入用户名',
        nickName: false,
        nickNameHelperText: '请输入昵称',
        password: false,
        passwordHelperText: '请输入密码',
        repeatPwd: false,
        repeatPwdHelperText: '请再次输入密码',
        verifyCode: false,
        verifyCodeHelperText: '请输入验证码',
        question: false,
        questionHelperText: '请输入密保问题',
        answer: false,
        answerHelperText: '请输入密保答案',
    });
    const validateInput = (e) => CheckRequiredAll({[e.target.name]:e.target.value}, setErrorInput);
    const userId = useRef(); const nickName = useRef();
    useEffect(() => {
        userId.current.addEventListener('change', (e)=>{
            validateRegisted(e,'userId');
        });
        nickName.current.addEventListener('change', (e)=>{
            validateRegisted(e,'nickName');
        });
    },[]);
    const validateRegisted = async (e, type) => {
        const typeCN = type==='nickName'?'昵称':'用户名'
        let notNull = CheckRequiredAll({[e.target.name]:e.target.value}, setErrorInput);
        if(notNull){
            const params = {type: type, content: e.target.value};
            setErrorInput(prevState => ({...prevState, [`${e.target.name}HelperText`]: `校验中...`}));
            let res = await interfaces.validateRegisted(params);
            if(res && res.data.ErrorCode !== 200){
                setErrorInput(prevState => ({...prevState, [e.target.name]: true, [`${e.target.name}HelperText`]: `该${typeCN}已被注册`}));
            } else {
                setErrorInput(prevState => ({...prevState, [e.target.name]: false, [`${e.target.name}HelperText`]: `请输入${typeCN}`}));
            }
        } else setErrorInput(prevState => ({...prevState, [`${e.target.name}HelperText`]: `请输入${typeCN}`}));
    };
    const validateRepeatPwd = (e) => {
        let notNull = CheckRequiredAll({[e.target.name]:e.target.value}, setErrorInput);
        if(notNull){
            if(registerParams.password !== registerParams.repeatPwd){
                setErrorInput(prevState => ({...prevState, repeatPwd: true, repeatPwdHelperText: `两次输入的密码不一致`}));
            } else {
                setErrorInput(prevState => ({...prevState, repeatPwd: false, repeatPwdHelperText: '请再次输入密码'}));
            }
        } else setErrorInput(prevState => ({...prevState, repeatPwdHelperText: '请再次输入密码'}));
    };

    return (
        <>
            <TextField className={loginless.input} size="small" ref={userId}
                name="userId" required helperText={errorInput.userIdHelperText}
                label="用户名" variant="outlined"
                onChange={handleChange} value={registerParams.userId}
                error={errorInput.userId}
            />
            <TextField className={loginless.input} size="small" ref={nickName}
                name="nickName" required helperText={errorInput.nickNameHelperText}
                label="昵称" variant="outlined"
                onChange={handleChange} value={registerParams.nickName}
                error={errorInput.nickName}
            />
            <TextField className={loginless.input} size="small"
                name="password" required helperText={errorInput.passwordHelperText}
                type={showPw?'text':'password'} label="密码" variant="outlined"
                onChange={handleChange} value={registerParams.password}
                onBlur={validateRepeatPwd} error={errorInput.password}
                InputProps={{
                    endAdornment: 
                        <InputAdornment position="end">
                            <IconButton className={loginless.iconButton} onTouchStart={()=>setShowPw(!showPw)} onMouseDown={()=>setShowPw(!showPw)} onTouchEnd={()=>setShowPw(!showPw)} onMouseUp={()=>setShowPw(!showPw)} aria-label="密码展示" edge="end"><Icon className={loginless.icon}>visibility</Icon></IconButton>
                        </InputAdornment>
                }}
            />
            <TextField className={loginless.input} size="small"
                name="repeatPwd" required helperText={errorInput.repeatPwdHelperText}
                type={showCheckPw?'text':'password'} label="确认密码" variant="outlined"
                onChange={handleChange} value={registerParams.repeatPwd}
                onBlur={validateRepeatPwd} error={errorInput.repeatPwd}
                InputProps={{
                    endAdornment: 
                        <InputAdornment position="end">
                            <IconButton className={loginless.iconButton} onTouchStart={()=>setShowCheckPw(!showCheckPw)} onMouseDown={()=>setShowCheckPw(!showCheckPw)} onTouchEnd={()=>setShowCheckPw(!showCheckPw)} onMouseUp={()=>setShowCheckPw(!showCheckPw)} aria-label="确认密码展示" edge="end"><Icon className={loginless.icon}>visibility</Icon></IconButton>
                        </InputAdornment>
                    }}
            />
            <Grid container item wrap="nowrap">
                <TextField className={loginless.input} size="small"
                    name="verifyCode" required
                    label="验证码" variant="outlined" helperText={errorInput.verifyCodeHelperText}
                    onChange={handleChange} value={registerParams.verifyCode}
                    onBlur={validateInput} error={errorInput.verifyCode}
                />
                <div className={loginless.verifyImg}>
                    <div className={loginless.progressShade} style={{display: getVerifyLoading ? '' : 'none'}}><CircularProgress size={24}/></div>
                    <img src={verifyCodeUrl} onClick={getVerifyCode} alt="验证码"/>
                </div>
            </Grid>
            <Grid container item wrap="nowrap" alignItems="center">
                <TextField className={loginless.input} size="small"
                    name="question" required helperText={errorInput.questionHelperText}
                    label="密保问题" variant="outlined"
                    onChange={handleChange} value={registerParams.question}
                    onBlur={validateInput} error={errorInput.question}
                />
                <Typography variant="body1" component="span" style={{margin: '-16px 5px 0 5px', fontWeight: 'bold'}}>:</Typography>
                <TextField className={loginless.input} size="small"
                    name="answer" required helperText={errorInput.answerHelperText}
                    label="密保答案" variant="outlined"
                    onChange={handleChange} value={registerParams.answer}
                    onBlur={validateInput} error={errorInput.answer}
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end">
                                <Tooltip disableFocusListener title="请确保你的密保问题足够安全">
                                    <IconButton className={loginless.iconButton} className={loginless.iconButton} aria-label="请确保你的密保问题足够安全" edge="end"><Icon className={loginless.icon}>error</Icon></IconButton>
                                </Tooltip>
                            </InputAdornment>
                    }}
                />
            </Grid>
            <div className={loginless.smallBtnGroup}>
                <Button onClick={()=>setLoginType(1)} className={loginless.smallBtnLeft} size="small" color="primary">{'< '}返回</Button>
            </div>
            <Button onClick={register} className={loginless.button} size="large" variant="contained" color="primary">注册</Button>
        </>
    );
};

const ForgetPwdComponent = props => {
    const loginless = useStyles();

    const [loginType, setLoginType] = useContext(LoginTypeContext);

    const [showPw, setShowPw] = useState(false);
    const [showCheckPw, setShowCheckPw] = useState(false);

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
        let res = await interfaces.getVerifyCode({verifySymbol: 3});
        setGetVerifyLoading(false);
        // 将验证码解密
        if(res && res.data.ErrorCode === 200){
            setVerifyCodeUrl(`data:image/svg+xml;base64,${common.Decrypt(res.data.data.imgData)}`);
        }
    };
    useEffect(() => {
        getVerifyCode();
    },[]);

    const [forgetPwdParams, setForgetPwdParams] = useState({
        userId: '',
        password: '',
        repeatPwd: '',
        question: '',
        answer: '',
        verifyCode: '',
    });
    const handleChange = (e) => ChangeVal(e, setForgetPwdParams);
    const changePwd = async () => {
        let flag = CheckRequiredAll(forgetPwdParams, setErrorInput);
        if(flag) {
            let {repeatPwd, question, ...params} = forgetPwdParams;
            params.password = common.confusionStr(common.PBKDF2Encrypt(forgetPwdParams.password));
            params.answer = common.confusionStr(common.PBKDF2Encrypt(forgetPwdParams.answer));
            let res = await interfaces.forgetPwd(params);
            console.log(res);
            if(res && res.data.ErrorCode === 200){
                alert().open({ content: '修改成功！' });
                setLoginType(1);
            }
        }
    }

    const [errorInput, setErrorInput] = useState({
        userId: false,
        userIdHelperText: '请输入用户名',
        password: false,
        passwordHelperText: '请输入密码',
        repeatPwd: false,
        repeatPwdHelperText: '请再次输入密码',
        answer: false,
        answerHelperText: '请输入密保答案',
        verifyCode: false,
        verifyCodeHelperText: '请输入验证码',
    });
    const validateInput = (e) => CheckRequiredAll({[e.target.name]:e.target.value}, setErrorInput);
    const userId = useRef();
    useEffect(async () => {
        userId.current.addEventListener('change', (e) => {
            validateUserId(e);
        });
    },[]);
    const validateUserId = async (e) => {
        let notNull = CheckRequiredAll({[e.target.name]:e.target.value}, setErrorInput);
        if(notNull){
            const params = {userId: e.target.value};
            setErrorInput(prevState => ({...prevState, userIdHelperText: `校验中...`}));
            let res = await interfaces.getSecurityQuestion(params);
            if(res && res.data.ErrorCode === 200){
                setForgetPwdParams(prevState => ({...prevState, question: res.data.data.question}));
                setErrorInput(prevState => ({...prevState, userIdHelperText: '请输入用户名'}));
            } else {
                setErrorInput(prevState => ({...prevState, userId: true, userIdHelperText: `该用户不存在`}));
                setForgetPwdParams(prevState => ({...prevState, question: ''}));
            }
        } else {
            setForgetPwdParams(prevState => ({...prevState, question: ''}));
            setErrorInput(prevState => ({...prevState, userIdHelperText: '请输入用户名'}));
        }
    }
    const validateRepeatPwd = (e) => {
        let notNull = CheckRequiredAll({[e.target.name]:e.target.value}, setErrorInput);
        if(notNull){
            if(forgetPwdParams.password !== forgetPwdParams.repeatPwd){
                setErrorInput(prevState => ({...prevState, repeatPwd: true, repeatPwdHelperText: `两次输入的密码不一致`}));
            } else {
                setErrorInput(prevState => ({...prevState, repeatPwd: false, repeatPwdHelperText: '请再次输入密码'}));
            }
        } else setErrorInput(prevState => ({...prevState, repeatPwdHelperText: '请再次输入密码'}));
    };

    return (
        <>
            <TextField className={loginless.input} size="small" ref={userId}
                name="userId" required
                label="用户名" variant="outlined" helperText={errorInput.userIdHelperText}
                onChange={handleChange} value={forgetPwdParams.userId}
                error={errorInput.userId}
            />
            <Collapse in={Boolean(forgetPwdParams.question)}>
                <TextField className={loginless.input} size="small"
                    type={showPw?'text':'password'} label="新密码" variant="outlined"
                    name="password" required helperText={errorInput.passwordHelperText}
                    onChange={handleChange} value={forgetPwdParams.password}
                    onBlur={validateRepeatPwd} error={errorInput.password}
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end">
                                <IconButton className={loginless.iconButton} onTouchStart={()=>setShowPw(!showPw)} onMouseDown={()=>setShowPw(!showPw)} onTouchEnd={()=>setShowPw(!showPw)} onMouseUp={()=>setShowPw(!showPw)} aria-label="密码展示" edge="end"><Icon className={loginless.icon}>visibility</Icon></IconButton>
                            </InputAdornment>
                    }}
                />
                <TextField className={loginless.input} size="small"
                    type={showCheckPw?'text':'password'} label="确认密码" variant="outlined"
                    name="repeatPwd" required helperText={errorInput.repeatPwdHelperText}
                    onChange={handleChange} value={forgetPwdParams.repeatPwd}
                    onBlur={validateRepeatPwd} error={errorInput.repeatPwd}
                    InputProps={{
                        endAdornment: 
                            <InputAdornment position="end">
                                <IconButton className={loginless.iconButton} onTouchStart={()=>setShowCheckPw(!showCheckPw)} onMouseDown={()=>setShowCheckPw(!showCheckPw)} onTouchEnd={()=>setShowCheckPw(!showCheckPw)} onMouseUp={()=>setShowCheckPw(!showCheckPw)} aria-label="密码展示" edge="end"><Icon className={loginless.icon}>visibility</Icon></IconButton>
                            </InputAdornment>
                        }}
                />
                <TextField className={loginless.input} size="small"
                    name="answer" required helperText={errorInput.answerHelperText}
                    label={'问:'+forgetPwdParams.question} variant="outlined"
                    onChange={handleChange} value={forgetPwdParams.answer}
                    onBlur={validateInput} error={errorInput.answer}
                />
                <Grid container item wrap="nowrap">
                    <TextField className={loginless.input} size="small"
                        name="verifyCode" required
                        label="验证码" variant="outlined" helperText={errorInput.verifyCodeHelperText}
                        onChange={handleChange} value={forgetPwdParams.verifyCode}
                        onBlur={validateInput} error={errorInput.verifyCode}
                    />
                    <div className={loginless.verifyImg}>
                        <div className={loginless.progressShade} style={{display: getVerifyLoading ? '' : 'none'}}><CircularProgress size={24}/></div>
                        <img src={verifyCodeUrl} onClick={getVerifyCode} alt="验证码"/>
                    </div>
                </Grid>
            </Collapse>
            <div className={loginless.smallBtnGroup}>
                <Button onClick={()=>setLoginType(1)} className={loginless.smallBtnLeft} size="small" color="primary">{'< '}返回</Button>
            </div>
            <Collapse in={Boolean(forgetPwdParams.question)}>
                <Button onClick={changePwd} className={loginless.button} size="large" variant="contained" color="primary">修改</Button>
            </Collapse>
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
        marginTop: '8px',
        width: '100%',
    },
    verifyImg: {
        minWidth: '95px',
        height: '38px',
        margin: '8px 0 0 10px',
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
        marginTop: '8px',
    },
    iconButton: {
        padding: '6px',
    },
    icon: {
        fontSize: '1.2rem',
    },
    smallBtnGroup: {
        display: 'flex',
        justifyContent: 'space-between',
        marginTop: '4px',
    },
    form: {
        margin: '5% 0',
        padding: '20px',
        minHeight: '600px',
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