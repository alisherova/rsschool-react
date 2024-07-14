import React from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { IoMdClose } from "react-icons/io";

interface Character {
    name: string;
    height: string;
    mass: string;
    hair_color: string;
    skin_color: string;
    eye_color: string;
    birth_year: string;
    gender: string;
}

interface DetailedCharacterName {
    detailedCharacterName: string | undefined;
    setCloseDetail: (condition: boolean) => void;
}

const CharacterDetail: React.FC<DetailedCharacterName> = ({ detailedCharacterName, setCloseDetail }) => {
    const [character, setCharacter] = React.useState<Character | null>(null);
    const navigate = useNavigate();

    React.useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const response = await fetch(`https://swapi.dev/api/people/?search=${encodeURIComponent(detailedCharacterName || '')}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                if (data.results.length === 0) {
                    navigate('/not-found');
                } else {
                    setCharacter(data.results[0]);
                }
            } catch (error) {
                console.error('Error fetching character:', error);
                navigate('/not-found');
            }
        };

        fetchCharacter();
    }, [detailedCharacterName]);

    if (!character) {
        return <Loader />;
    }

    return (
        <div className="characterDetail">
            <div className='closeBtn' onClick={() => setCloseDetail(true)}><IoMdClose /></div>
            <h2>{character.name}</h2>
            <p><span className='detailPr'>Height:</span> {character.height}</p>
            <p><span className='detailPr'>Mass: </span> {character.mass}</p>
            <p><span className='detailPr'>Hair Color: </span> {character.hair_color}</p>
            <p><span className='detailPr'>Skin Color: </span> {character.skin_color}</p>
            <p><span className='detailPr'>Eye Color: </span> {character.eye_color}</p>
            <p><span className='detailPr'>Birth Year: </span> {character.birth_year}</p>
            <p><span className='detailPr'>Gender: </span> {character.gender}</p>
        </div>
    );
};

export default CharacterDetail;
