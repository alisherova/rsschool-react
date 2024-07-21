import React, { useEffect, useState } from 'react'
import SearchSection from '../components/SearchSection';
import ResultsSection from '../components/ResultsSection';
import CharacterDetail from '../components/CharacterDetail';
import { Outlet } from 'react-router-dom';

interface MainPageProps {
    setCloseDetail: (value: boolean) => void;
}

const MainPage: React.FC<MainPageProps> = ({ setCloseDetail }) => {
    const [detailedCharacterName, setDetailedCharacterName] = useState<string>()
    const [searchTerm, setSearchTerm] = useState<string>(() => {
        return localStorage.getItem('searchTerm') || " ";
    });
    const handleSearchTermChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm.trim());
    };
    useEffect(() => {
        localStorage.setItem('searchTerm', searchTerm)
    }, [])

    return (
        <div className='mainPageContainer'>
            <div className='mainWrapper'>
                <SearchSection onSearch={handleSearchTermChange} />
                <ResultsSection changeName={setDetailedCharacterName} setCloseDetail={setCloseDetail} />
            </div>
            <Outlet />
            {/* {closeDetail || } */}
        </div>
    )
}
export default MainPage