import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPost, IPostsState } from "../../interfaces/post";
import { deletePostAction, getPostsAction, setDataModalEdit, } from "../../redux/actions/postsActions";
import Spinner from "../utils/Spinner";
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import EditPost from "../Modal/EditPost";
import { alertDeleteItems } from "../../helpers/alerts";
import AddPost from "../Modal/AddPost";


type ReducerPost = { posts: IPostsState }

const TablePosts = () => {
    const dispatch = useDispatch();
    const savedPosts = useSelector((state: ReducerPost) => state.posts.savedPosts);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [opendModalEdit, setOpendModalEdit] = useState<boolean>(false);
    const [opendModalAdd, setOpendModalAdd] = useState<boolean>(false);


    useEffect(() => {
        savedPosts.length
            ? setPosts(savedPosts)
            : dispatch(getPostsAction({ setPosts, setLoading }))
    }, [dispatch])

    const modalEdit = (dataPostToEdit: IPost) => {
        dispatch(setDataModalEdit(dataPostToEdit));
        setOpendModalEdit(true);
    }

    const deletePost = async (id: string | number) => {
        const resp: boolean = await alertDeleteItems('Are you sure you want to delete the post?');
        resp && dispatch(deletePostAction(id, { statePosts: posts, setPosts }));
    }

    if (loading) return <Spinner />

    return (
        <div>
            {opendModalEdit && <EditPost closeModal={setOpendModalEdit} statePosts={posts} setPosts={setPosts} />}
            {opendModalAdd && <AddPost closeModal={setOpendModalAdd} statePosts={posts} setPosts={setPosts} />}
            <button onClick={() => setOpendModalAdd(true)}>Add Post</button>

            <table className='posts__table'>
                <thead className='' >
                    <tr className=''>
                        <th className="th">Title</th>
                        <th className="th">Body</th>
                        <th className="th">User ID</th>
                        <th className="th">Actions</th>

                    </tr>
                </thead>
                <tbody>
                    {
                        posts.map(post => (
                            <tr key={post.id}>
                                <td className="td">{post.title}</td>
                                <td className="td">{post.body}</td>
                                <td className="td">{post.userId}</td>
                                <td className="td">
                                    <div className="posts__contetnButtons">
                                        <AiFillEdit style={{ cursor: 'pointer', fontSize: '21px' }}
                                            onClick={() => modalEdit(post)}
                                        />
                                        <MdDelete style={{ cursor: 'pointer', fontSize: '21px' }}
                                            onClick={() => deletePost(post.id)}
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
// border-collapse: collapse; 
export default TablePosts;
