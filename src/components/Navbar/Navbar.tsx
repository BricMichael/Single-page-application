import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { logoutUserAction } from "../../redux/actions/authActions";



const Navbar = () => {
    const dispatch = useDispatch();
    const logoutBtn = () => dispatch(logoutUserAction())

    return (
        <nav>
            <Link to='/algo'>Algo prueba Hoja1</Link>

            <button type='submit' onClick={logoutBtn}>
                Logout
            </button>
        </nav>
    )
}



export default Navbar
