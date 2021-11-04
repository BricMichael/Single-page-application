import {  IUser } from "../interfaces/loginAndRegister";

const validateForm = (values: IUser  ) => {
    const regEmail: boolean = !/\S+@\S+\.\S+/.test(values.email);

    let countErrors: number = 0;
    let errors: IUser = {
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    }

  
    if (!values.username.trim()) {
        errors.username = 'Username required';
        countErrors++
    }
        
    if (!values.email || regEmail) {
        errors.email = 'Email address is invalid';
        countErrors++  
    }
     
    if (values.password.length < 6) {
        errors.password = 'Password needs to be 6 characters or more';
        countErrors++
    }
      
    if (!values.confirmPassword || values.confirmPassword !== values.password) {
        errors.confirmPassword = 'Passwords do not match';
        countErrors++ 
    }  
   
    return {
        errors,
        countErrors
    }
}



export default validateForm;