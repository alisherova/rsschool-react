import React from 'react';
import { useRouter } from "next/router"
import { IoMdClose } from "react-icons/io";
import Loader from './Loader';
import { useGetCharacterDetailQuery } from "../store/apiSlice"
import { setCloseDetail } from '../store/characterSlice';
import { useAppDispatch } from '../hooks';


const CharacterDetail: React.FC = () => {
    const router = useRouter();
    const { query } = router;
    const dispatch = useAppDispatch()
    const name = router.query.character;
    const characterName = Array.isArray(name) ? name[0] : name || '';
    const { data, isLoading } = useGetCharacterDetailQuery(characterName);
    if (isLoading) {
        return <div role="status"><Loader /></div>;
    }

    if (!data) {
        return <div>No character found.</div>;
    }

    const closeDetailFunc = () => {
        const updatedQuery = { ...query };
        delete updatedQuery.character;
        router.push({
            pathname: router.pathname,
            query: updatedQuery,
        }, undefined, { shallow: true });
        dispatch(setCloseDetail(false))
    }

    return (
        <div className="characterDetail">
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
