import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import routers from './router/index';
import RenderRoutes from './router/RenderRoutes'
import api from '@/api/index';

import store from '@/store/index';

function App() {
    const history = useHistory();
    window._reacthistory = useHistory();

    useEffect(async () => {
        const token = localStorage.getItem('token');
        if(token){
            store.dispatch({type: 'SET_TOKEN', token}); // 存入redux，用于axios添加请求头
            let res = await api.getUserInfoSecurity(); // token登录
            if(res && res.data.ErrorCode === 200){
                // 登录成功
                console.log(res.data.data);
                sessionStorage.setItem('token', token); // 缓存登录态
                store.dispatch({type: 'SET_USERINFO', userInfo: res.data.data}); // redux存储用户信息
            } else {
                // 登录失败，清空所有信息
                localStorage.removeItem('token');
                sessionStorage.removeItem('token');
                store.dispatch({type: 'SET_TOKEN', token: ''});
                store.dispatch({type: 'SET_USERINFO', userInfo: {}});
            }
        }
    },[]);

    return (
        <>
            {RenderRoutes(routers)}
        </>
    );
}

export default App;