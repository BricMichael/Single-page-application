import axios from "axios";
import { IPost } from "../interfaces/post";

const urlApi = 'http://localhost:5000/posts';





export const apiGetPosts = () => axios.get(urlApi);
export const apiAddPost = (post: IPost) => axios.post(urlApi, post);
export const apiUpdatePost = (id: string | number, postUpdate: IPost) => axios.put(`${urlApi}/${id}`, postUpdate);
export const apiDeletePost = (id: string | number) => axios.delete(`${urlApi}/${id}`);