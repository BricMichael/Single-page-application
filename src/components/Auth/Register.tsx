import { Link } from "react-router-dom";
import { FC, FormEvent, useState } from "react";
import { useDispatch } from "react-redux";
import validateForm from "../../helpers/validateFom";
import { useForm } from "../../Hooks/useForm";
import { IUser } from "../../interfaces/loginAndRegister";
import { registerUserAction } from "../../redux/actions/authActions";


const initialState: IUser = {
    username: '', email: '', confirmPassword: '', password: ''
}

const Register: FC = () => {
    const dispatch = useDispatch();
    const [errorsInputs, setErrors] = useState<IUser>(initialState);
    const {values, handleInputChange, reset} = useForm<IUser>(initialState);


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {errors, countErrors} = validateForm(values);
        setErrors(errors);
    
        if( !countErrors ) {
            reset();
            dispatch(registerUserAction(values));      
        }
    }

    return (
        <div className='form_content'>
            <form className="form" onSubmit={handleSubmit}>
                <h1>Create your account by filling out the information below</h1>

                <div className="form_inputs">
                    <label htmlFor="name" className="form_label">Username</label>
                    <input 
                        type="text" 
                        name='username' 
                        value={values.username} 
                        placeholder='Enter your username' 
                        className="form_input" 
                        id='name' 
                        autoFocus
                        onChange={handleInputChange}
                    />
                    { errorsInputs.username && <p>{errorsInputs.username}</p> }
                </div>
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
                <div className="form_inputs">
                    <label htmlFor="password2" className="form_label">Confirm Password</label>
                    <input 
                        type="password" 
                        name='confirmPassword' 
                        value={values.confirmPassword} 
                        placeholder='Repeat your password' 
                        className="form_input" 
                        id='password2'
                        onChange={handleInputChange}
                    />
                    { errorsInputs.confirmPassword && <p>{errorsInputs.confirmPassword}</p> }
                </div>
                <button className="form_inputBtn" type='submit'>
                    Sign up
                </button>
                <span className='form_linkLogin'>
                    Already have an account? Login
                    <Link className='form_linkLogin' to='/auth/login' >here</Link>
                </span>
            </form>
        </div>
    )
}



export default Register;
