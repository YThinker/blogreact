import home from './modules/home';

import Index from '@/pages/Index';
import Login from '@/pages/Login';
import Error from '@/pages/Error';

export default [
    {
        path: '/',
        exact: true,
        component: Index,
    },
    {
        path: '/login',
        exact: true,
        component: Login,
    },
    {
        path: '/index',
        component: Index,
        routes: [...home]
    },
    {
        path: '*',
        component: Error,
    },
]