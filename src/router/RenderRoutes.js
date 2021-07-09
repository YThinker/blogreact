import React from "react";
import { Switch, Route, Redirect } from "react-router";

import store from "@/store/index";

const loginPath = '/login';

const RenderRoutes = (routes, extraProps = {}, switchProps = {}) =>
    {
        let authed = sessionStorage.getItem('token');
        return routes ? (
            <Switch {...switchProps}>
                <Redirect exact from="/" to="/index/home"></Redirect>
                <Redirect exact from="/index" to="/index/home"></Redirect>
                {routes.map((route, i) => (
                    <Route
                        key={route.key || i}
                        path={route.path}
                        exact={route.exact}
                        strict={route.strict}
                        render={props => {
                                if( !route.requiredAuth || authed || route.path === loginPath){
                                    return <route.component {...props} {...extraProps} route={route} />
                                }
                                return <Redirect from={loginPath} to={{ pathname:loginPath, state:{from:props.location} }} />
                            }
                        }
                    />
                ))}
            </Switch>
        ) : null;
    }
 export default RenderRoutes;