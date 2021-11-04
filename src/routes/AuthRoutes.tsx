import { Route, Switch } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';



const AuthRouter = () => {
    return (
        <div className=''>
            <div className=''>
                <Switch>
                    <Route path='/auth/login' component={ Login}/>
                    <Route exact path='/auth/register' component={ Register} />
                </Switch>   
            </div>       
        </div>
    )
}

export default AuthRouter
