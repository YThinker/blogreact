import React, { useState } from 'react';
import loginless from './Login.module.less';
import TextField from '@material-ui/core/TextField';

const Login = props => {
    // true为登录，false为注册
    const [loginType, setLoginType] = useState(true);

    return (
        <main className={loginless.contain}>
            <form className={loginless.form}>
                <fieldset>
                    <legend align="center">{loginType ? '登录' : '注册'}</legend>
                    <LoginComponent style={{display:loginType?'block':'none',}}/>
                    <SigninComponent style={{display:loginType?'none':'block',}}/>
                </fieldset>
            </form>
        </main>
    );
}

const LoginComponent = props => {
    return (
        <>
            <TextField className={loginless.input} label="用户名" variant="filled" />
            <TextField className="input" label="密码" variant="outlined" />
        </>
    );
};

const SigninComponent = props => {
    return (
        <>
            <input type="text" />
            <input type="text" />
        </>
    );
};

export default Login;