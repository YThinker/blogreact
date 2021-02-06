import React from 'react';
import { useHistory } from 'react-router-dom';
import routers from './router/index';
import RenderRoutes from './router/RenderRoutes'

function App() {
    const history = useHistory();
    window._reacthistory = useHistory();
    return (
        <>
            {RenderRoutes(routers)}
        </>
    );
}

export default App;