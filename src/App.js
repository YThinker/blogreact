import React from 'react';
import routers from './router/index';
import RenderRoutes from './router/RenderRoutes'

function App() {
    console.log(routers);
    return (
        <>
            {RenderRoutes(routers)}
        </>
    );
}

export default App;