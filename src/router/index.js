import home from './modules/home';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Error from '../pages/Error';

export default [
    {
        path: '/home',
        component: Home,
    },{
        path: '/login',
        component: Login,
    },{
        path: '/error',
        component: Error,
    },
    ...home,
]