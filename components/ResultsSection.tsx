import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import Loader from './Loader';
import Pagination from './Pagination';
import useSearchQuery from '../hooks/useSearchQuery';

interface Character {
    name: string;
}

interface ApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Character[];
}

interface Card {
    id: string;
    name: string;
}

interface ChangeName {
    changeName: (name: string) => void;
    setCloseDetail: (condition: boolean) => void;
    cards?: Card[]
}

const ResultsSection: React.FC<ChangeName> = ({ changeName, setCloseDetail, cards = [] }) => {
    const [searchTerm] = useSearchQuery(" ");

    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);

    const [page, setPage] = React.useState<number>(() => {
        return parseInt(params.get('page') || '1', 10)
    });

    const [results, setResults] = React.useState<Character[]>(cards);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [totalCount, setTotalCount] = React.useState<number>(0);

    useEffect(() => {
        const fetchResults = async () => {
            if (!searchTerm) return;
            setLoading(true);
            try {
                const response = await fetch(`https://swapi.dev/api/people/?search=${encodeURIComponent(searchTerm)}&page=${page}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                } else if (response.status === 404) {
                    navigate('/not-found');
                }
                const data: ApiResponse = await response.json();
                setResults(data.results);
                setTotalCount(data.count);

            } catch (error) {
                console.error('Error fetching results:', error);
                navigate('/not-found');
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchTerm, page]);

    const handlePageChange = (newPage: number) => {
        params.set('page', newPage.toString());
        setPage(newPage)
        navigate({ search: params.toString() });
    };

    const handleCardClick = (name: string) => {
        changeName(name);
        params.set('character', name.toString());
        navigate(`/character/${name}`);
        setCloseDetail(true)
    };

    const totalPages = Math.ceil(totalCount / 10);

    return (
        <div className="resultsSection">
            <h2>Search Results</h2>
            {loading ? (
                <div role='status'><Loader /></div>
            ) : (
                <>
                    <ul className="resultsList">
                        {results.map((character: Character) => (
                            <li
                                id={character.name}
                                key={character.name}
                                className="characterCard"
                                onClick={() => handleCardClick(character.name)}
                            >
                                <h3 className="characterName"><CgProfile /> {character.name}</h3>
                            </li>
                        ))}
                    </ul>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </>
            )}
        </div>
    );
};

export default ResultsSection;
