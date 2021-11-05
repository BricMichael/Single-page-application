import * as api from '../../api/api';
import { Dispatch } from "react";
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { IPost, IPostsState } from "../../interfaces/post";
import { PostType } from "../types";
import { alertSuccess, anErrorHasOccurred } from '../../helpers/alerts';


interface IProps {
    setPosts: Dispatch<React.SetStateAction<IPost[]>>
    setLoading: Dispatch<React.SetStateAction<boolean>>
}

interface IStateAndSetState {
    statePosts: IPost[]
    setPosts: IProps['setPosts']
}

type CloseModal = (handle: boolean) => void;
type DispachAsync = ThunkDispatch<IPostsState, never, AnyAction>

export const getPostsAction = ({ setPosts, setLoading }: IProps): DispachAsync => async (dispatch: any) => {
    try {
        setLoading(true);
        const { data } = await api.apiGetPosts();
        setLoading(false);

        if (data) {
            setPosts(data);
            dispatch({
                type: PostType.savedPosts,
                payload: data
            })
        }
    } catch (error) {
        console.log(error);
    }
}

export const addPostAction = (post: IPost, closeModal: CloseModal, { statePosts, setPosts }: IStateAndSetState): DispachAsync => async (dispatch: any) => {
    try {
        setPosts([post, ...statePosts]); // implement the change immediately for a better user experience.
        closeModal(false);
        alertSuccess('Post created successfully');

        const { status } = await api.apiAddPost(post);

        if (status >= 400) {
            anErrorHasOccurred('There was an error saving the article');
            setPosts(statePosts); //if an error occurs, keep the old data.      
        } else {
            dispatch({ type: PostType.addPost, payload: post });
        }
    } catch (error) {
        console.log(error);
    }
}


export const setDataModalEdit = (post: IPost) => ({ type: PostType.dataModalEdit, payload: post });

export const clearDataModalEdit = () => ({ type: PostType.closeModal });


export const updatePostAction = (newData: IPost, closeModal: CloseModal, { statePosts, setPosts }: IStateAndSetState): DispachAsync => async (dispatch: any) => {
    try {
        // implement the change immediately for a better user experience
        setPosts(statePosts.map(post => post.id === newData.id ? newData : post));
        closeModal(false);
        alertSuccess('Updated publication');

        const { status } = await api.apiUpdatePost(newData.id, newData);


        if (status >= 400) {
            anErrorHasOccurred('An error has occurred, changes have not been saved');
            setPosts(statePosts); //if an error occurs, keep the old data 
        } else {
            dispatch({ type: PostType.updatePost, payload: newData });
        }
    } catch (error) {
        console.log(error);
    }
}


export const deletePostAction = (id: string | number, { statePosts, setPosts }: IStateAndSetState): DispachAsync => async (dispatch: any) => {
    try {
        // implement the change immediately for a better user experience
        setPosts(statePosts.filter(post => post.id !== id));
        alertSuccess('Post removed successfully');

        const { status } = await api.apiDeletePost(id);

        if (status >= 400) {
            anErrorHasOccurred('An error occurred, the post could not be deleted.');
            setPosts(statePosts); //if an error occurs, keep the old data 
        } else {
            dispatch({ type: PostType.deletePost, payload: { id } });
        }
    } catch (error) {
        console.log(error);
    }
}