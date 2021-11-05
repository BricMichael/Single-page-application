import { IAuthActions, IAuthState } from "../../interfaces/auth";
import { AuthType } from "../types";



const initialState: IAuthState = {
    loggedUser: { username: '', email: '', password: '', userId: 0 },
    usersSavedData: [], //simulate data saved in the BBDD.
    isloggedIn: false  // tokenFakeAction
}

const authReducer = (state = initialState, action: IAuthActions) => {
    const { type, payload } = action;
    switch (type) {
        case AuthType.registerUser:
            return {
                ...state,
                loggedUser: payload,
                usersSavedData: [...state.usersSavedData, payload],
                isloggedIn: true
            }
        case AuthType.loginUser:
            return {
                ...state,
                loggedUser: payload,
                isloggedIn: true
            }
        case AuthType.validToken:
            return {
                ...state,
                isloggedIn: true
            }
        case AuthType.logout:
            return {
                ...state,
                loggedUser: initialState.loggedUser,
                isloggedIn: false
            }
        default:
            return state;
    }

}

export default authReducer;