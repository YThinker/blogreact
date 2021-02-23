import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import routers from './router/index';
import RenderRoutes from './router/RenderRoutes'
import interfaces from '@/interfaces/index';

import store from '@/store/index';

function App() {
    const history = useHistory();
    window._reacthistory = useHistory();

    useEffect(async () => {
        const token = localStorage.getItem('token');
        if(token){
            store.dispatch({type: 'SET_TOKEN', token});
            let res = await interfaces.getUserInfoSecurity();
            if(res && res.data.ErrorCode === 200){
                console.log(res.data.data);
                store.dispatch({type: 'SET_USERINFO', userInfo: res.data.data});
            } else {
                localStorage.removeItem('token');
                store.dispatch({type: 'SET_TOKEN', token: ''});
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