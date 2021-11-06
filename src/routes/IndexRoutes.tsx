import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Sidebar from '../components/Sidebar/Sidebar';
import { IAuthState } from '../interfaces/auth';
import FormsAuth from '../pages/FormsAuth';


type ReducerAuth = { login: IAuthState };

const IndexRoutes = () => {

    const isLoggedIn = useSelector((state: ReducerAuth) => state.login.isloggedIn);


    return (
        <Router>
            <Switch>
                <PrivateRoute path='/home' component={Sidebar} isAuthenticated={isLoggedIn} />
                <PublicRoute path='/auth' component={FormsAuth} isAuthenticated={isLoggedIn} />
                <Redirect to="/auth/login" />
            </Switch>
        </Router>
    )
}

export default IndexRoutes;
