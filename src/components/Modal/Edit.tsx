import React, { FC, FormEvent } from 'react'
import { useDispatch } from 'react-redux';
import Modal from './Modal';
import { clearDataModalEdit } from '../../redux/actions/postsActions';
import { clearDataModalEditTask } from '../../redux/actions/tasksAction';
import { Inputs } from '../../Hooks/useForm';


interface IProps {
    nameComponent: 'editTask' | 'editPost'
    values: { title?: string, body?: string, description?: string }
    handleSubmit: (e: FormEvent<HTMLFormElement>) => void
    handleInputChange: (e: Inputs) => void
    closeModal: (handle: boolean) => void
}


const Edit: FC<IProps> = ({ nameComponent, values, handleSubmit, closeModal, handleInputChange }) => {
    const dispacth = useDispatch();
    const checkComponentPost: boolean = nameComponent === 'editPost';

    const cancelEditBtn = () => {
        checkComponentPost
            ? dispacth(clearDataModalEdit())
            : dispacth(clearDataModalEditTask())
        closeModal(false);
    }

    return (
        <Modal closeModal={closeModal}>
            <div className="modalPost">
                <h2 className="modalPost__title">{checkComponentPost ? 'Updating post' : 'Updating task'}</h2>

                <form className="modalPost__form" onSubmit={handleSubmit}>
                    {
                        checkComponentPost &&
                        <div className="modalPost__formGroup">
                            <label className="modalPost__formGroup_label">Title</label>
                            <input
                                type="text"
                                value={values.title}
                                name='title'
                                onChange={handleInputChange}
                                className="modalPost__formGroup_input" />
                        </div>
                    }

                    <div className="modalPost__formGroup">
                        <label className="modalPost__formGroup_label">{checkComponentPost ? 'Body' : 'Description'}</label>
                        <textarea
                            className="modalPost__formGroup_textarea"
                            name={checkComponentPost ? 'body' : 'description'}
                            value={checkComponentPost ? values.body : values.description}
                            onChange={handleInputChange}>
                        </textarea>
                    </div>

                    <div className="modalPost__buttons">
                        <button className="modalPost__buttons_btn succes" type='submit'>
                            Save changes
                        </button>
                        <button className="modalPost__buttons_btn danger" onClick={cancelEditBtn} type='button'>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    )
}

export default Edit
