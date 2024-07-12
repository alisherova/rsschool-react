import React, { useEffect, useState } from 'react'
import SearchSection from '../components/SearchSection';
import ResultsSection from '../components/ResultsSection';

const MainPage: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>(() => {
        return localStorage.getItem('searchTerm') || " ";
    });
    const handleSearchTermChange = (newSearchTerm: string) => {
        setSearchTerm(newSearchTerm.trim());
    };

    useEffect(() => {
        localStorage.setItem('searchTerm', searchTerm)
    }, [searchTerm])
    return (
        <div>
            <SearchSection onSearch={handleSearchTermChange} />
            <ResultsSection searchTerm={searchTerm} />
        </div>
    )
}
export default MainPage