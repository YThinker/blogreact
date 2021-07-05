import TodoList from '@/pages/TodoList/TodoList';
import Home from '@/pages/Home/Home';

export default [
    {
        path: '/index/home',
        exact: true,
        component: Home,
    },
    {
        path: '/index/todolist',
        exact: true,
        component: TodoList,
        requiredAuth: true,
    }
];