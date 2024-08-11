'use client'
import React, { ChangeEvent, useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import useSearchQuery from '../hooks/useSearchQuery';

const SearchSection: React.FC = () => {
    const [newSearchTerm, setNewSearchTerm] = useState<string>("")
    const [searchTerm, setSearchTermWithUrlUpdate] = useSearchQuery();

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setNewSearchTerm(event.target.value);
    };

    return (
        <div className="search-section">
            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter search term..."
                    defaultValue={searchTerm}
                    onChange={(event) => handleInputChange(event)}
                />
                <span className="h-line"></span>
                <button className="searchBtn" onClick={() => setSearchTermWithUrlUpdate(newSearchTerm)}>
                    <CiSearch />
                </button>
            </div>
        </div>
    );
};

export default SearchSection;
