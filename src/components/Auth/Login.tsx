import { Link } from "react-router-dom";
import { FC, FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "../../Hooks/useForm";
import { ILogin } from "../../interfaces/loginAndRegister";
import { loginUserAction, tokenFakeAction } from "../../redux/actions/authActions";


const initialState: ILogin = {
    email: '', password: '',
}

const Login: FC = () => {
    const dispatch = useDispatch();
    const [errorsInputs, setErrors] = useState<ILogin>(initialState);
    const {values, handleInputChange, reset} = useForm<ILogin>(initialState);

    useEffect(() => {
       const checkToken = JSON.parse(localStorage.getItem('isLoggedIn') || '{}' );
       checkToken?.isLoggedIn && dispatch(tokenFakeAction());
    }, [dispatch])


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(loginUserAction(values, setErrors, reset));  
    }

    return (
        <div className='form_content'>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Welcome back</h1>

                <div className="form_inputs">
                    <label htmlFor="email" className="form_label">Email</label>
                    <input 
                        type="email" 
                        name='email' 
                        value={values.email} 
                        placeholder='Enter your email' 
                        className="form_input" 
                        required 
                        id='email'
                        onChange={handleInputChange}
                    />
                    { errorsInputs.email && <p>{errorsInputs.email}</p> }
                </div>
                <div className="form_inputs">
                    <label htmlFor="password1" className="form_label">Password</label>
                    <input 
                        type="password" 
                        name='password' 
                        value={values.password} 
                        placeholder='Enter your password' 
                        className="form_input" 
                        id='password1' 
                        onChange={handleInputChange}
                    />
                    { errorsInputs.password && <p>{errorsInputs.password}</p> }
                </div>

                <button className="form_inputBtn" type='submit'>
                    Sign up
                </button>
                <span className='form_linkLogin'>
                    <Link className='form_linkLogin' to='/auth/register'>Create new account</Link>
                </span>
            </form>
        </div>
    )
}



export default Login;
