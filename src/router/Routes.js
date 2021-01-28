import React from 'react';
import { Route, Redirect, Switch, useLocation } from 'react-router-dom';

function RouterGuard(props) {
    let location = useLocation();
    let { pathname } = location; //将要跳转的路径
    let thisrouterConf = props.routers.find( conf => conf.path === pathname ); //将要跳转的路由配置
    let isLogin = sessionStorage.getItem('isLogin'); //是否登录
    console.log('isLogin',isLogin);
    // 如果未登录
    if( !isLogin ){
        if( pathname==='/login' ){
            return <Route path={pathname} component={thisrouterConf.component} exact />
        } else if( !thisrouterConf ) {
            return <Redirect to='/error' />
        } else {
            if( !thisrouterConf.requiredAuth ){
                return <Route path={pathname} component={thisrouterConf.component} exact />
            } else {
                return <Redirect to='/login' />
            }
        }
    } else {
        if( pathname==='/login' ){
            return <Redirect to='/' />
        } else if( thisrouterConf ){
            return <Route path={pathname} component={thisrouterConf.component} exact />
        } else {
            return <Redirect to='/error' />
        }
    }
}

function Routes(props) {
    return (
        <Switch>
            <Redirect exact from="/" to="/home" />
            <RouterGuard routers={props.routers}/>
        </Switch>
    );
}

export default Routes;