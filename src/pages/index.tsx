import React, { useEffect } from 'react';
import { useRouter } from "next/router"
import { SearchSection, ResultsSection, ThemeSelector, CharacterDetail } from '../../components';
import { useAppSelector } from '../../hooks';
import { RootState } from '../../store';

const MainPage: React.FC = () => {
    const router = useRouter()
    const { query } = router;
    const { character } = router.query;
    const closeDetail = useAppSelector((state: RootState) => state.character.closeDetail);

    useEffect(() => {
        if (!isValidQuery(query)) {
            router.replace('/404');
        }
    }, [query]);

    const isValidQuery = (query: { [key: string]: string | string[] | undefined }) => {
        const character = query.character;
        if (character && !isValidCharacter(character)) {
            return false;
        }

        const search = query.search;
        if (search && !isValidSearch(search)) {
            return false;
        }

        const page = query.page;
        if (page && !isValidPage(page)) {
            return false;
        }

        return true;
    };


    const isValidCharacter = (value: string | string[]) => {
        return typeof value === 'string' && value.trim() !== '';
    };

    const isValidSearch = (value: string | string[]) => {
        return typeof value === 'string' && value.trim() !== '';
    };

    const isValidPage = (value: string | string[]) => {
        if (Array.isArray(value)) {
            return false;
        }

        const pageNumber = parseInt(value as string, 10);
        return !isNaN(pageNumber) && pageNumber > 0;
    };

    return (
        <div className='mainPageContainer'>
            <div className='mainWrapper'>
                <ThemeSelector />
                <SearchSection />
                <ResultsSection />
            </div>
            {closeDetail && character && (
                <CharacterDetail />
            )}
        </div>
    );
};

export default MainPage;
