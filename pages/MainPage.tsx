import React, { useEffect, useState } from 'react'
import SearchSection from '../components/SearchSection';
import ResultsSection from '../components/ResultsSection';
import CharacterDetail from '../components/CharacterDetail';

const MainPage: React.FC = () => {
    const [detailedCharacterName, setDetailedCharacterName] = useState<string>()
    const [closeDetail, setCloseDetail] = React.useState<boolean>(true);
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
            {closeDetail || <CharacterDetail setCloseDetail={setCloseDetail} detailedCharacterName={detailedCharacterName} />}
        </div>
    )
}
export default MainPage