



export interface IProps {
    closeModal: (handle: boolean) => void
    children?: JSX.Element
}

const Modal: React.FC<IProps> = ({ closeModal, children }) => {
    const preventParentEvent = (e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation();

    return (
        <div className='modalContainer'
            onClick={() => closeModal(false)}>

            <div className='modalBody ' onClick={preventParentEvent}>
                {children}
            </div>
        </div>
    )
}

export default Modal;
