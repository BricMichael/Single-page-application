import React from 'react';
import { Route, Redirect } from "react-router-dom";


interface PublicRouteProps {
    exact?: boolean
    path: string
    component: React.ComponentType<any>
    isAuthenticated: boolean
}

const PublicRoute = ({ isAuthenticated, component: Component, ...restProps }: PublicRouteProps) => {
    return (
        <Route {...restProps}
            component={(props: any) => (
                (!isAuthenticated)
                    ? <Component  {...props} />
                    : <Redirect to='/home/posts' />
            )}
        />
    )
}


export default PublicRoute;
