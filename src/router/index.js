import home from './modules/home';
import Index from '@/pages/Index';
import Login from '../pages/Login';
import Error from '../pages/Error';

export default [
    {
        path: '/login',
        component: Login,
    },{
        path: '/error',
        component: Error,
    },
    {
        path: '/index',
        component: Index,
    },
    ...home,
]