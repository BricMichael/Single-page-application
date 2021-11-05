import axios from "axios";
import { IPost } from "../interfaces/post";
import { ITask } from "../interfaces/task";


//This data in a real project must go in environment variables.
const urlPosts = 'http://localhost:5000/posts';
const urlTasks = 'http://localhost:5000/tasks'


type ID = string | number;

// api Posts
export const apiGetPosts = () => axios.get(urlPosts);
export const apiAddPost = (post: IPost) => axios.post(urlPosts, post);
export const apiUpdatePost = (id: ID, postUpdate: IPost) => axios.put(`${urlPosts}/${id}`, postUpdate);
export const apiDeletePost = (id: ID) => axios.delete(`${urlPosts}/${id}`);


// api Tasks
export const apiGetTasks = () => axios.get(urlTasks);
export const apiAddTask = (task: ITask) => axios.post(urlTasks, task);
export const apiUpdateTask = (id: ID, taskUpdate: ITask) => axios.put(`${urlTasks}/${id}`, taskUpdate);
export const apiDeleteTask = (id: ID) => axios.delete(`${urlTasks}/${id}`);