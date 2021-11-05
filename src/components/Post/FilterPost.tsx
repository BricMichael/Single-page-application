import { FC } from "react";
import { useSelector } from "react-redux"
import { useForm } from "../../Hooks/useForm";
import { IPost } from "../../interfaces/post";
import { ReducerPost } from "./TablePosts";


interface IProps {
    setPosts: React.Dispatch<React.SetStateAction<IPost[]>>
}


const FilterPost: FC<IProps> = ({ setPosts }) => {
    const savedPosts = useSelector((state: ReducerPost) => state.posts.savedPosts);
    const { values, handleInputChange } = useForm({ userId: '' });

    const getAllUsersId = savedPosts.map(post => post.userId.toString());
    const noRepeatingUserId: (string | number)[] = [...new Set(getAllUsersId)];


    const filterPostsByUserId = () => {
        values.userId === 'allPost'
            ? setPosts(savedPosts)
            : setPosts(savedPosts.filter(post => post.userId.toString() === values.userId))
    }

    return (
        <div>
            <label htmlFor="filter">Filter by user ID</label>
            <select name="userId" id="filter" value={values.userId} onChange={handleInputChange}>
                <option value="allPost" className="filter__option">All posts</option>
                {
                    noRepeatingUserId.map(post => (
                        <option key={post} value={post} className="filter__option">{post}</option>
                    ))
                }
            </select>

            <button type='submit' className='succes' onClick={filterPostsByUserId}>Filter</button>
        </div>
    )
}

export default FilterPost
