import React, { useState } from 'react';
import loginless from './Login.module.less';

const Login = props => {
    // true为登录，false为注册
    const [loginType, setLoginType] = useState(true);

    return (
        <main className={loginless.contain}>
            <form className={loginless.form}>
                <fieldset>
                    <legend align="center">{loginType ? '登录' : '注册'}</legend>
                    <LoginComponent style={{display:loginType?'block':'none'}}/>
                    <SigninComponent style={{display:loginType?'none':'block'}}/>
                </fieldset>
            </form>
        </main>
    );
}

const LoginComponent = props => {
    return (
        <>
            <input type="text" />
            <input type="text" />
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