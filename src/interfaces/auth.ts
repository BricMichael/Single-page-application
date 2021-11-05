export interface IAuth {
    username: string
    email: string
    password: string
    userId: string | number
}

export interface IAuthActions {
    type: string,
    payload?: IAuth
}

export interface IAuthState {
    loggedUser: IAuth
    usersSavedData: IAuth[]
    isloggedIn: boolean
}