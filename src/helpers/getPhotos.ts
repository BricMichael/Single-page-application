import axios from "axios";
import { IRespImage } from "../pages/Gallery";

// https://api.unsplash.com/search/photos?query=london&per_page=5&client_id=qlhv85-K-rwoerKgA3sFJJlPm2jJ8uHHNcxqaTpdXm0
const keyApi = `qlhv85-K-rwoerKgA3sFJJlPm2jJ8uHHNcxqaTpdXm0`;

const urlFunction = (query: string) => `https://api.unsplash.com/search/photos?query=${query}&per_page=16&client_id=${keyApi}`;


interface IProps {
    setLoading: React.Dispatch<React.SetStateAction<boolean>>
    setPhotos: React.Dispatch<React.SetStateAction<IRespImage[]>>
    query: string
}

export const getPhotos = async ({ query, setPhotos, setLoading }: IProps) => {
    setLoading(true);
    const { data, status } = await axios.get((urlFunction(query)), { headers: { 'Access-Control-Allow-Origin': '*' } });
    setLoading(false);
    status === 200 && setPhotos(data.results);
}