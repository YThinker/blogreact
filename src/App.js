import React from 'react';
import { useHistory } from 'react-router-dom';
import routers from './router/index';
import RenderRoutes from './router/RenderRoutes'

import store from '@/store/index';

function App() {
    const history = useHistory();
    window._reacthistory = useHistory();

    const token = localStorage.getItem('token');
    if(token){
        store.dispatch({type: 'SET_TOKEN', token});
    }
    return (
        <>
            {RenderRoutes(routers)}
        </>
    );
}

export default App;