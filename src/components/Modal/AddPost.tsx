import { FC, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../Hooks/useForm";
import Modal from "./Modal";
import { v4 as uuidv4 } from 'uuid';
import { addPostAction } from "../../redux/actions/postsActions";
import { IPost } from "../../interfaces/post";
import { IAuthState } from "../../interfaces/auth";


interface IPropsModal {
    closeModal: (handle: boolean) => void
    statePosts: IPost[]
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>
}

export type ReducerAuth = { login: IAuthState }

const AddPost: FC<IPropsModal> = ({ closeModal, statePosts, setPosts }) => {
    const dispacth = useDispatch();
    const userId: string | number = useSelector((state: ReducerAuth) => state.login.loggedUser.userId);
    const { values, handleInputChange } = useForm({ title: '', body: '' });


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const submitData = { userId, id: uuidv4().slice(30), ...values };
        dispacth(addPostAction(submitData, closeModal, { statePosts, setPosts }));

    }



    const cancelEditBtn = () => closeModal(false);


    return (
        <Modal closeModal={closeModal}>
            <div className="modalPost">
                <h2 className="modalPost__title">Create a post</h2>

                <form className="modalPost__form " onSubmit={handleSubmit}>
                    <div className="modalPost__formGroup">
                        <label className="modalPost__formGroup_label">Title</label>
                        <input
                            type="text"
                            value={values.title}
                            name='title'
                            onChange={handleInputChange}
                            className="modalPost__formGroup_input" />
                    </div>

                    <div className="modalPost__formGroup">
                        <label className="modalPost__formGroup_label">Body</label>
                        <textarea
                            className="modalPost__formGroup_textarea"
                            name='body' value={values.body}
                            onChange={handleInputChange}>
                        </textarea>
                    </div>

                    <div className="modalPost__buttons">
                        <button className="modalPost__buttons_btn success" type='submit'>
                            Save post
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

export default AddPost
