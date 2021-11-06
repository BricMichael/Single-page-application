import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IPost, IPostsState } from "../../interfaces/post";
import { deletePostAction, getPostsAction, setDataModalEdit, } from "../../redux/actions/postsActions";
import Spinner from "../utils/Spinner";
import Pagination from "./Pagination";
import { AiFillEdit } from 'react-icons/ai';
import { MdDelete } from 'react-icons/md';
import AddPost from "../Modal/AddPost";
import EditPost from "../Modal/EditPost";
import { alertDeleteItems } from "../../helpers/alerts";
import FilterPost from "./FilterPost";



export type ReducerPost = { posts: IPostsState }

const TablePosts = () => {
    const dispatch = useDispatch();
    const savedPosts = useSelector((state: ReducerPost) => state.posts.savedPosts);
    const [posts, setPosts] = useState<IPost[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [opendModalEdit, setOpendModalEdit] = useState<boolean>(false);
    const [opendModalAdd, setOpendModalAdd] = useState<boolean>(false);


    useEffect(() => {
        savedPosts.length
            ? setPosts(savedPosts)
            : dispatch(getPostsAction({ setPosts, setLoading }))
    }, [])

    const modalEdit = (dataPostToEdit: IPost) => {
        dispatch(setDataModalEdit(dataPostToEdit));
        setOpendModalEdit(true);
    }

    const deletePost = async (id: string | number) => {
        const resp: boolean = await alertDeleteItems('Are you sure you want to delete the post?');
        resp && dispatch(deletePostAction(id, { statePosts: posts, setPosts }));
    }

    const postsPerPage = 10;
    const pagesVisited = pageNumber * postsPerPage;
    const displayPosts: IPost[] = posts.length < 15 ? posts : posts.slice(pagesVisited, pagesVisited + postsPerPage);
    // if it is less than 15 it is because the data in the state was filtered therefore the 100 are not complete
    const changePage = (numberPage: number) => setPageNumber(numberPage);

    return (
        <div>
            {opendModalEdit && <EditPost closeModal={setOpendModalEdit} statePosts={posts} setPosts={setPosts} />}
            {opendModalAdd && <AddPost closeModal={setOpendModalAdd} statePosts={posts} setPosts={setPosts} />}

            {loading
                ? <Spinner />
                : <>
                    <div className='topTable'>
                        <FilterPost setPosts={setPosts} />
                        <button onClick={() => setOpendModalAdd(true)} className='success post__btnAdd'>Add Post</button>
                    </div>

                    <div>
                        {
                            displayPosts.map(post => (
                                <div key={post.id} className='post__data'>
                                    <p><strong>UserID:</strong> {post.userId}</p>
                                    <p><strong>Title:</strong> {post.title}</p>
                                    <p className='post__data_body'><strong>Body:</strong> {post.body}</p>
                                    <p className='post__data_action'><strong>Actions:</strong>
                                        <i className="posts__contetnButtons">
                                            <AiFillEdit onClick={() => modalEdit(post)} className='postActionsBtn' />

                                            <MdDelete onClick={() => deletePost(post.id)} className='postActionsBtn' />
                                        </i>
                                    </p>
                                </div>
                            ))
                        }
                    </div>
                </>
            }
            {posts.length >= 20 && <Pagination totalPost={posts.length} postsPerPage={postsPerPage} changePage={changePage} />}
        </div>
    )
}

export default TablePosts;