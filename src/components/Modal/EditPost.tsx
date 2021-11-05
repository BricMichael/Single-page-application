import { FC, FormEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "../../Hooks/useForm";
import Edit from "./Edit";
import { updatePostAction } from "../../redux/actions/postsActions";
import { IPost, IPostsState } from "../../interfaces/post";


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

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispacth(updatePostAction(values, closeModal, { statePosts, setPosts }));
    }

    const dataToEditModal = { title: values.title, body: values.body }

    return (
        <Edit
            values={dataToEditModal}
            nameComponent='editPost'
            handleSubmit={handleSubmit}
            closeModal={closeModal}
            handleInputChange={handleInputChange}
        />
    )
}

export default EditPost;
