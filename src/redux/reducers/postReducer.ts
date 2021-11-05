import { IPostsActions, IPostsState } from "../../interfaces/post";
import { PostType } from "../types";



const initialState: IPostsState = {
    savedPosts: [],
    dataModalEdit: { id: 0, userId: 0, body: '', title: '' }
}

const postReducer = (state = initialState, action: IPostsActions) => {

    switch (action.type) {
        case PostType.savedPosts:
            return {
                ...state,
                savedPosts: [...action.payload]
            }
        case PostType.addPost:
            return {
                ...state,
                savedPosts: [action.payload, ...state.savedPosts]
            }
        case PostType.updatePost:
            return {
                ...state,
                savedPosts: state.savedPosts.map(post => post.id === action.payload.id
                    ? action.payload
                    : post
                ),
                dataModalEdit: initialState.dataModalEdit
            }
        case PostType.dataModalEdit:
            return {
                ...state,
                dataModalEdit: action.payload
            }
        case PostType.closeModal:
            return {
                ...state,
                dataModalEdit: initialState.dataModalEdit
            }
        case PostType.deletePost:
            return {
                ...state,
                savedPosts: state.savedPosts.filter(post => post.id !== action.payload.id)
            }
        default:
            return state;
    }

}

export default postReducer;