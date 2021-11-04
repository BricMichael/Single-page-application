export interface IAuth {
    username: string 
    email: string 
    password: string
}

export interface IAuthActions {
    type: string, 
    payload?: IAuth 
}

export interface IAuthState {
    loggedUser: IAuth
    userSavedData: IAuth[]
    isloggedIn: boolean
}