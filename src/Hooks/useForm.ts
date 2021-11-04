import { ChangeEvent,  useState } from 'react';

type Inputs = ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>

interface IUseForm<T> {
    values: T, 
    reset: (newState?: T ) => void,
    handleInputChange: ( {target}: Inputs ) => void,
}

export const useForm = <T> ( initialState: T ): IUseForm<T> => {

    const [values, setValues] = useState<T>( initialState );

    const reset = (newState: T = initialState): void => setValues(newState);

    const handleInputChange = ( {target}: Inputs): void => {
        
        setValues({
            ...values,
            [target.name]: target.value
        });
    }

    return {values, handleInputChange, reset}  
}