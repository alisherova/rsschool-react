import React from 'react';
import { CgProfile } from "react-icons/cg";
import Loader from './Loader';

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

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[];
}

interface ResultsSectionProps {
    searchTerm: string | null;
}

const ResultsSection: React.FC<ResultsSectionProps> = ({ searchTerm }) => {
    const [results, setResults] = React.useState<Character[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);


    React.useEffect(() => {
        const fetchResults = async () => {
            if (!searchTerm) return;
            setLoading(true);
            try {
                const response = await fetch(`https://swapi.dev/api/people/?search=${encodeURIComponent(searchTerm)}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data: ApiResponse = await response.json();
                setResults(data.results);
            } catch (error) {
                console.error('Error fetching results:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchTerm]);

    return (
        <div className="resultsSection">
            <h2>Search Results</h2>
            {loading ? (
                <Loader />
            ) : (
                <ul className="resultsList">
                    {results.map((character: Character) => (
                        <li key={character.name} className="characterCard">
                            <h3 className="characterName"><CgProfile /> {character.name}</h3>
                            <div className="characterDetails">
                                <p className="characterDetailItem">Height: {character.height}</p>
                                <p className="characterDetailItem">Mass: {character.mass}</p>
                                <p className="characterDetailItem">Hair Color: {character.hair_color}</p>
                                <p className="characterDetailItem">Skin Color: {character.skin_color}</p>
                                <p className="characterDetailItem">Eye Color: {character.eye_color}</p>
                                <p className="characterDetailItem">Birth Year: {character.birth_year}</p>
                                <p className="characterDetailItem">Gender: {character.gender}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default ResultsSection;
