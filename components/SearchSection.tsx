import React, { ChangeEvent } from 'react';
import useSearchQuery from "../hooks/useSearchQuery"
import { CiSearch } from 'react-icons/ci';

interface SearchSectionProps {
    onSearch: (newSearchTerm: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useSearchQuery(' ');

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value.trim());
    };

    const handleSearch = () => {
        onSearch(searchTerm);
    };

    return (
        <div className="search-section">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter search term..."
                    value={searchTerm}
                    onChange={handleInputChange}
                />
                <span className='h-line'></span>
                <button className='searchBtn' onClick={handleSearch}>
                    <CiSearch />
                </button>
            </div>
        </div>
    );
};

export default SearchSection;
