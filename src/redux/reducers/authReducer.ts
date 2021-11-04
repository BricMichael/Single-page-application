import { IAuthActions, IAuthState } from "../../interfaces/auth";
import { types } from "../types";



const initialState: IAuthState = {
    loggedUser: {username:'', email: '', password: '' },
    userSavedData: [], //simulate data saved in the BBDD.
    isloggedIn: false
}

const authReducer = ( state = initialState, action: IAuthActions) => {
    const { type, payload } = action;
    switch ( type ) {
        case types.registerUser:
            return {
                ...state,
                loggedUser: payload,
                userSavedData: [...state.userSavedData, payload],
                isloggedIn: true          
            }
        case types.loginUser:
            return{
                ...state,
                loggedUser: payload,
                isloggedIn: true  
            }    
        case types.validToken:
            return{
                ...state,
                isloggedIn: true
            }    
        case types.logout:
            return{
                ...state,
                loggedUser: initialState.loggedUser,
                isloggedIn: false        
            }    
        default:
            return state;
    }

}

export default authReducer;