import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import useDebounce from '../hooks/useDebounce';
import useSearchQuery from '../hooks/useSearchQuery';

interface SearchSectionProps {
    onSearch: (newSearchTerm: string) => void;
}

const SearchSection: React.FC<SearchSectionProps> = ({ onSearch }) => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm, setSearchTermWithUrlUpdate] = useSearchQuery(" ");

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTimeout(() => {
            setSearchTermWithUrlUpdate(event.target.value)
        }, 500);
        console.log(searchTerm, "search section")
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
                <button className="searchBtn" onClick={() => onSearch(searchTerm)}>
                    <CiSearch />
                </button>
            </div>
        </div>
    );
};

export default SearchSection;
