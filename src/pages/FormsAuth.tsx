import { Route, Switch, Redirect } from 'react-router-dom';
import Login from '../components/Auth/Login';
import Register from '../components/Auth/Register';

const FormsAuth = () => {
    return (
        <div className='auth__main'>
            <div className='auth__box-containter'>
                <Switch>
                    <Route path='/auth/login' component={ Login}/>
                    <Route exact path='/auth/register' component={ Register} />
                    <Redirect to='/auth/login' />
                </Switch>   
            </div>       
        </div>
    )
}

export default FormsAuth;


// import { Route, Switch } from 'react-router-dom';
// import Login from '../components/Auth/Login';
// import Register from '../components/Auth/Register';



// const AuthRouter = () => {
//     return (
//         <div className=''>
//             <div className=''>
//                 <Switch>
//                     <Route path='/auth/login' component={ Login}/>
//                     <Route exact path='/auth/register' component={ Register} />
//                 </Switch>   
//             </div>       
//         </div>
//     )
// }

// export default AuthRouter
