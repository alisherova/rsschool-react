import React, { ChangeEvent } from 'react';
import { CiSearch } from 'react-icons/ci';
import useSearchQuery from '../hooks/useSearchQuery';

const SearchSection: React.FC = () => {
    const [searchTerm, setSearchTermWithUrlUpdate] = useSearchQuery(" ");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTermWithUrlUpdate(event.target.value);
    };

    return (
        <div className="search-section">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter search term..."
                    defaultValue={searchTerm}
                    onChange={handleInputChange}
                />
                <span className="h-line"></span>
                <button className="searchBtn" onClick={() => setSearchTermWithUrlUpdate(searchTerm)}>
                    <CiSearch />
                </button>
            </div>
        </div>
    );
};

export default SearchSection;
