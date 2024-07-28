import React, { ChangeEvent } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg";
import {Pagination, Flyout, Loader} from './index';
import { useAppDispatch, useAppSelector, useSearchQuery } from '../hooks'; 
import { useSearchCharactersQuery } from '../store/apiSlice';
import { setSelectedCharacter, toggleItemSelection } from '../store/characterSlice';

interface Character {
    name: string;
}

interface ChangeName {
    setCloseDetail: (condition: boolean) => void;
}

const ResultsSection: React.FC<ChangeName> = ({ setCloseDetail }) => {
    const [searchTerm] = useSearchQuery(" ");
    const location = useLocation();
    const navigate = useNavigate();

    const params = new URLSearchParams(location.search);

    const [page, setPage] = React.useState<number>(() => {
        return parseInt(params.get('page') || '1', 10);
    });

    const [results, setResults] = React.useState<Character[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [totalCount, setTotalCount] = React.useState<number>(0);
    const dispatch = useAppDispatch();
    const selectedItems = useAppSelector((state) => state.character.selectedItems);


    const { data, isLoading } = useSearchCharactersQuery({ name: searchTerm, page });

    React.useEffect(() => {
        setLoading(isLoading)
        if (data) {
            setResults(data.results)
            setTotalCount(data.count)
        }
    }, [data, isLoading, dispatch]);

    const handlePageChange = (newPage: number) => {
        params.set('page', newPage.toString());
        setPage(newPage);
        navigate({ search: params.toString() });
    };

    const handleCardClick = (name: string) => {
        dispatch(setSelectedCharacter(name));
        params.set('character', name.toString());
        navigate(`/character/${name}`);
        setCloseDetail(true);
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, toggledCharacter: { name: string }) => {
        e.stopPropagation()
        e.nativeEvent.stopPropagation()
        e.isPropagationStopped()
        dispatch(toggleItemSelection(toggledCharacter));
    };

    const totalPages = Math.ceil(totalCount / 10);

    return (
        <div className="resultsSection">
            <h2>Search Results</h2>
            {loading ? (
                <div role='status'><Loader /></div>
            ) : (
                <>
                    <Pagination
                        currentPage={page}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                    {Object.keys(selectedItems).length > 0 && <Flyout />}
                    <ul className="resultsList">
                        {results.map((character: Character) => (
                            <li
                                id={character.name}
                                key={character.name}
                                className="characterCard"
                                onClick={() => handleCardClick(character.name)}
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedItems.some(item => item.name === character.name)}
                                    onChange={(e) => handleCheckboxChange(e, character)}
                                />
                                <h3 className="characterName"> {character.name}<CgProfile /></h3>
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};

export default ResultsSection;
