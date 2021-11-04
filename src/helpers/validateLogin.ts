import {  ILogin } from "../interfaces/loginAndRegister";

interface IDataSaved {
    passwordSaved: string
    emailSaved: string
}

const validateLogin = (values: ILogin, {passwordSaved, emailSaved }: IDataSaved  ) => {
    const regEmail: boolean = !/\S+@\S+\.\S+/.test(values.email);

    let countErrors: number = 0;
    let errors: ILogin = {
        email: '',
        password: ''
    }
     
    if (regEmail) {
        errors.email = 'Email address is invalid';
        countErrors++  
    }
 
    if ( values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters or more';
        countErrors++
    }else if ( values.password !== passwordSaved || values.email !== emailSaved) {
        errors.password = 'Incorrect data try again, please try again'; 
        // The password should not be reported as incorrect, for security reasons.
        countErrors++
        
    }
      
   
    return {
        errors,
        countErrors
    }
}



export default validateLogin;