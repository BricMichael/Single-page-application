import { PostType } from "../redux/types"


export interface IPost {
    userId: number | string
    id: number | string
    title: string
    body: string
}

interface IAddPost {
    type: PostType.addPost
    payload: IPost
}

interface ISavedPosts {
    type: PostType.savedPosts
    payload: IPost[]
}

interface IUpdatePost {
    type: PostType.updatePost
    payload: IPost
}

interface IDataModalEdit {
    type: PostType.dataModalEdit
    payload: IPost
}

interface ICloseModal { type: PostType.closeModal }

interface IDeletePost {
    type: PostType.deletePost
    payload: { id: number | string }
}

type ClearData = { type: PostType.clearDataPost }

export type IPostsActions = ISavedPosts | IAddPost | IUpdatePost | IDeletePost | IDataModalEdit | ICloseModal | ClearData


export interface IPostsState {
    savedPosts: IPost[]
    dataModalEdit: IPost

}