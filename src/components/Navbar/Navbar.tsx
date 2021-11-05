import { Switch, Route, Redirect } from 'react-router-dom';
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import PagePosts from "../../pages/PagePosts";
import { logoutUserAction } from "../../redux/actions/authActions";
import PageTasks from '../../pages/PageTasks';




const Navbar = () => {
    const dispatch = useDispatch();
    const logoutBtn = () => dispatch(logoutUserAction())

    return (
        <>
            <nav>
                <Link to='/home/posts'>Posts</Link>
                <Link to='/home/tasks'>Tasks</Link>

                <button type='submit' onClick={logoutBtn}>
                    Logout
                </button>
            </nav>

            <Switch>
                <Route component={PageTasks} exact path='/home/tasks' />
                <Route component={PagePosts} path='/home/posts' />

                <Redirect to='/home/posts' />
            </Switch>
        </>
    )
}



export default Navbar
