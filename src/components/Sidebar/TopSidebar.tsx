import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaUserAlt } from 'react-icons/fa';
import { RiLogoutBoxRLine } from 'react-icons/ri';

import { logoutUserAction } from "../../redux/actions/authActions";

type UserAuth = { username: string };

const TopSidebar = () => {
    const user: UserAuth = JSON.parse(localStorage.getItem('isLoggedIn') || '{}');
    const dispatch = useDispatch();
    const logoutBtn = () => dispatch(logoutUserAction())

    return (
        <aside className='home__sidebar'>
            <div className="home__sidebar_head">
                <p className='username'>
                    <i className='icon_head'><FaUserAlt /></i>
                    {user?.username}
                </p>
                <button className="home__sidebar_btn" type='submit' onClick={logoutBtn}>
                    <i><RiLogoutBoxRLine /></i> &nbsp;
                    Logout
                </button>
            </div>

            <div className='home__sidebar_links'>
                <Link to='/home/posts'>Posts</Link>
                <Link to='/home/tasks'>Tasks</Link>
                <Link to='/home/gallery'>Gallery</Link>
            </div>
        </aside>
    )
}

export default TopSidebar
