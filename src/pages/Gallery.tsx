import { FormEvent, useEffect, useState } from "react";
import Spinner from "../components/utils/Spinner";
import { getPhotos } from "../helpers/getPhotos";
import { useForm } from "../Hooks/useForm"


export interface IRespImage {
    urls: { regular: string }
    id: string
}


const Gallery = () => {
    const [photos, setPhotos] = useState<IRespImage[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const { values, handleInputChange, reset } = useForm({ query: '' });


    useEffect(() => {
        getPhotos({ query: 'fall', setLoading, setPhotos });
    }, [])


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await getPhotos({ query: values.query, setLoading, setPhotos });
        reset();
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='gallery_form'>
                <input
                    type="text"
                    name='query'
                    value={values.query}
                    onChange={handleInputChange}
                    className='gallery_input'
                    placeholder='Search images here'
                    autoFocus
                />
                <button type='submit' className='gallery_button success'>Search</button>
            </form>
            {loading
                ? <Spinner />
                : <div className="rowGallery">
                    {
                        photos.map(img => (
                            <div className="colum" key={img.id} >
                                <img src={img.urls.regular} alt="titleGallery" className='gallery_img' />
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default Gallery
