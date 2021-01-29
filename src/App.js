import React from 'react';
import Routes from './router/Routes';
import routers from './router/index';

function App() {
    console.log(routers);
    return (
        <Routes routers={routers} />
    );
}

export default App;