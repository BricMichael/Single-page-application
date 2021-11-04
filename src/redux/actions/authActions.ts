import { Dispatch } from "react";
import validateLogin from "../../helpers/validateLogin";
import { IAuth, IAuthActions, IAuthState} from "../../interfaces/auth";
import { ILogin, IUser } from "../../interfaces/loginAndRegister";

import { types } from "../types";


export const registerUserAction = ( userData: IUser ) => (dispatch: Dispatch<IAuthActions>) => {  
    const { confirmPassword, ...data } = userData;
    localStorage.setItem('isLoggedIn', JSON.stringify({ isLoggedIn: true, username: userData.username }));
    
    dispatch({
       type: types.registerUser,
       payload: data
    })
    
}


type FuncErrors = React.Dispatch<React.SetStateAction<ILogin>>
export const loginUserAction = (user: ILogin, setErrors: FuncErrors, resetForm: () => void) => {
  
    return ( dispatch: Dispatch<IAuthActions>, getState: () => {login: IAuthState } ) => {
        const userData = getState().login.userSavedData;
        const checkUser: IAuth | undefined = userData.find(userDB => userDB.password === user.password && userDB.email === user.email);
        
        const dataUser = { emailSaved: checkUser?.email || '', passwordSaved: checkUser?.password || '' };
        const { errors, countErrors } = validateLogin(user, dataUser);
        setErrors(errors);

        if(!countErrors) {
            resetForm();
            dispatch({ type: types.loginUser, payload: checkUser });  
            localStorage.setItem('isLoggedIn', JSON.stringify({ isLoggedIn: true, username: checkUser?.username || '' }));      
        }
    }  
} 

export const tokenFakeAction = () => ({ type: types.validToken });


export const logoutUserAction = () => (dispatch: Dispatch<IAuthActions>) => {
    localStorage.removeItem('isLoggedIn');
    dispatch({ type: types.logout })
}

