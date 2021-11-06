import { FC } from 'react';


interface IProps {
    postsPerPage: number
    totalPost: number
    changePage: (pageNumber: number) => void
}

const Pagination: FC<IProps> = ({ postsPerPage, totalPost, changePage }) => {
    const setPageNumber: number[] = [];

    for (let i = 0; i < Math.ceil(totalPost / postsPerPage); i++) setPageNumber.push(i)

    return (
        <div className='content_pagination'>
            {
                setPageNumber.map(item => (
                    <span key={item} onClick={() => changePage(item)} className='buttons__pagination'>
                        {item}
                    </span>
                ))
            }
        </div>
    )
}

export default Pagination;
