import { BrowserRouter as Router, Switch, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AuthRouter from './AuthRoutes';
import PublicRoute from './PublicRoute';
import PrivateRoute from './PrivateRoute';
import Navbar from '../components/Navbar/Navbar';
import { IAuthState } from '../interfaces/auth';


type ReducerAuth = { login: IAuthState };

const IndexRoutes = () => {

    const isLoggedIn = useSelector((state: ReducerAuth) => state.login.isloggedIn);
    console.log(isLoggedIn)

    return (
        <Router>
            <Switch>
               
                <PrivateRoute path='/pag1' exact component={Navbar} isAuthenticated={isLoggedIn} />
                <PublicRoute path='/auth' component={AuthRouter} isAuthenticated={isLoggedIn} />
                <Redirect to="/auth/login" />
            </Switch>
        </Router>
    )
}

export default IndexRoutes;
