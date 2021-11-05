import Swal from 'sweetalert2';


export const alertSuccess = (msg: string) => {
    Swal.fire({
        position: 'center',
        icon: 'success',
        text: msg,
        showConfirmButton: false,
        timer: 1300,
        width: '360px'
    })
}

export const alertDeleteItems = async (msg: string): Promise<boolean> => {
    const { isConfirmed } = await Swal.fire({
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#25258f',
        cancelButtonColor: '#2c2929',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        width: '450px',
    })

    if (isConfirmed) return true;
    return false;
}

export const alertQuestionItems = async (msg: string): Promise<boolean> => {
    const { isConfirmed } = await Swal.fire({
        text: msg,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#13b9b9',
        confirmButtonText: 'Confirm',
        cancelButtonText: 'Cancel',
        width: '455px',
    })

    if (isConfirmed) return true;
    return false;

}