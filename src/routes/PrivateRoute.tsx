import { Redirect, Route} from 'react-router';


interface ProtectedRouteProps{
    exact?: boolean
    path: string
    component: React.ComponentType<any>
    isAuthenticated: boolean
}

const PrivateRoute = ({isAuthenticated, component: Component, ...restProps}: ProtectedRouteProps) => {
  
    return (
        <Route {...restProps} 
            component={ (props: any) => (
                (isAuthenticated)
                ? <Component  {...props} />
                : <Redirect to='/auth/login' />
            )}  
        />    
    )
}; 

export default PrivateRoute;
