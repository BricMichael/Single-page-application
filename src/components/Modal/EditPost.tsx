import { FC, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../Hooks/useForm";
import Modal from "./Modal";
import { IPost, IPostsState } from "../../interfaces/post";
import { clearDataModalEdit, updatePostAction } from "../../redux/actions/postsActions";


type ReducerPost = { posts: IPostsState }

interface IPropsModal {
    closeModal: (handle: boolean) => void
    statePosts: IPost[]
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>
}

const EditPost: FC<IPropsModal> = ({ closeModal, statePosts, setPosts }) => {
    const dispacth = useDispatch();
    const dataToEdit = useSelector((state: ReducerPost) => state.posts.dataModalEdit);
    const { values, handleInputChange } = useForm<IPost>(dataToEdit);

    const cancelEditBtn = () => {
        dispacth(clearDataModalEdit());
        closeModal(false);
    }


    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispacth(updatePostAction(values, closeModal, { statePosts, setPosts }));
    }

    return (

        <Modal closeModal={closeModal}>
            <div className="modalPost">
                <h2 className="modalPost__title">Updating post</h2>

                <form className="modalPost__form" onSubmit={handleSubmit}>
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

export default EditPost;
