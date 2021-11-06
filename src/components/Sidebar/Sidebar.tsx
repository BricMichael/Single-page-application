import { Switch, Route, Redirect } from 'react-router-dom';
import Gallery from '../../pages/Gallery';
import PagePosts from "../../pages/PagePosts";
import PageTasks from '../../pages/PageTasks';
import TopSidebar from './TopSidebar';



const Navbar = () => {


    return (
        <div className='home__main-content'>
            <TopSidebar />


            <main className='main__components'>
                <Switch>
                    <Route component={Gallery} exact path='/home/gallery' />
                    <Route component={PageTasks} exact path='/home/tasks' />
                    <Route component={PagePosts} path='/home/posts' />

                    <Redirect to='/home/posts' />
                </Switch>
            </main>
        </div>
    )
}



export default Navbar
