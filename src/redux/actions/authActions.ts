import { Dispatch } from "react";
import validateLogin from "../../helpers/validateLogin";
import { IAuth, IAuthActions, IAuthState } from "../../interfaces/auth";
import { ILogin, IUser } from "../../interfaces/loginAndRegister";
import { v4 as uuidv4 } from 'uuid';
import { AuthType } from "../types";
import { clearDataPostAction } from "./postsActions";


export const registerUserAction = (userData: IUser) => (dispatch: Dispatch<IAuthActions>) => {
    const { confirmPassword, ...dataUser } = userData;
    localStorage.setItem('isLoggedIn', JSON.stringify({ isLoggedIn: true, username: userData.username }));

    dispatch({
        type: AuthType.registerUser,
        payload: { userId: uuidv4().slice(30), ...dataUser }
    })
}


type GetState = () => { login: IAuthState }
type FuncErrors = React.Dispatch<React.SetStateAction<ILogin>>


export const loginUserAction = (user: ILogin, setErrors: FuncErrors, resetForm: () => void) => {

    return (dispatch: Dispatch<IAuthActions>, getState: GetState) => {
        const userData = getState().login.usersSavedData;
        const checkUser: IAuth | undefined = userData.find(userDB => userDB.password === user.password && userDB.email === user.email);

        const dataUser = { emailSaved: checkUser?.email || '', passwordSaved: checkUser?.password || '' };
        const { errors, countErrors } = validateLogin(user, dataUser);
        setErrors(errors);

        if (!countErrors) { // length === 0
            resetForm();
            dispatch({ type: AuthType.loginUser, payload: checkUser });
            localStorage.setItem('isLoggedIn', JSON.stringify({ isLoggedIn: true, username: checkUser?.username || '' }));
        }
    }
}

export const tokenFakeAction = () => ({ type: AuthType.validToken });


export const logoutUserAction = () => (dispatch: Dispatch<any>) => {
    localStorage.removeItem('isLoggedIn');
    dispatch({ type: AuthType.logout })
    dispatch(clearDataPostAction());
}

