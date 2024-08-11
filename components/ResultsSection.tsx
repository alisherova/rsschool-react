"use client"
// components/ResultsSection.tsx
import React, { ChangeEvent } from 'react';
import { useRouter } from "next/router";
import { CgProfile } from "react-icons/cg";
import { Pagination, Flyout, Loader } from './index';
import { useAppDispatch, useAppSelector, useSearchQuery } from '../hooks';
import { useSearchCharactersQuery } from '../store/apiSlice';
import { setSelectedCharacter, setCloseDetail, toggleItemSelection } from '../store/characterSlice';
import { RootState } from '../store';
import { setPage } from '../store/paginationSlice';

interface Character {
    name: string;
}

const ResultsSection: React.FC = () => {
    const [searchTerm] = useSearchQuery();
    const router = useRouter();
    const dispatch = useAppDispatch();
    const params = new URLSearchParams(router.query as any);

    const selectedItems = useAppSelector((state) => state.character.selectedItems);
    const page = useAppSelector((state: RootState) => state.pagination.currentPage)
    const { data, isLoading } = useSearchCharactersQuery({ name: searchTerm, page });

    const [results, setResults] = React.useState<Character[]>([]);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [totalCount, setTotalCount] = React.useState<number>(0);

    React.useEffect(() => {
        setLoading(isLoading)
        if (data) {
            setResults(data.results)
            setTotalCount(data.count)
        }
    }, [data, isLoading]);

    const handlePageChange = (newPage: number) => {
        params.set('page', newPage.toString());
        dispatch(setPage(newPage))
        router.push(`/?page=${newPage}`, undefined, { shallow: true });
    };

    const handleCardClick = (name: string) => {
        dispatch(setSelectedCharacter(name));
        params.set('character', name.toString());
        router.push(`/?${params.toString()}`, undefined, { shallow: true });
        dispatch(setCloseDetail(true))
    };

    const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, toggledCharacter: { name: string }) => {
        e.stopPropagation()
        e.nativeEvent.stopPropagation()
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
