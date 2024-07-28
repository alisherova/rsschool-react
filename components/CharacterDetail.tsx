import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { IoMdClose } from "react-icons/io";
import Loader from './Loader';
import { useGetCharacterDetailQuery } from "../store/apiSlice"

interface DetailedCharacterName {
    name?: string | undefined;
    closeDetail: boolean;
    setCloseDetail: (value: boolean) => void;
}

const CharacterDetail: React.FC<DetailedCharacterName> = ({ closeDetail, setCloseDetail }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = new URLSearchParams(location.search);
    const { name } = useParams<{ name: string }>();
    const { data, isLoading } = useGetCharacterDetailQuery(name || '');

    if (isLoading) {
        return <div role="status"><Loader /></div>;
    }

    if (!data) {
        return <div>No character found.</div>;
    }

    const closeDetailFunc = () => {
        setCloseDetail(false)
        navigate({ pathname: '/', search: params.toString() });
    }

    return (
        closeDetail && <div className="characterDetail">
            <div className='closeBtn' onClick={() => closeDetailFunc()} data-testid="close-button"><IoMdClose /></div>
            <h2>{data.name}</h2>
            <p>Height: {data.height}</p>
            <p>Mass: {data.mass}</p>
            <p>Hair Color: {data.hair_color}</p>
            <p>Skin Color: {data.skin_color}</p>
            <p>Eye Color: {data.eye_color}</p>
            <p>Birth Year: {data.birth_year}</p>
            <p>Gender: {data.gender}</p>
        </div >
    );
};

export default CharacterDetail;
