import React from 'react';
import { SearchSection, ResultsSection, ThemeSelector } from '../components';
import { Outlet } from 'react-router-dom';

interface MainPageProps {
    setCloseDetail: (value: boolean) => void;
}

const MainPage: React.FC<MainPageProps> = ({ setCloseDetail }) => {
    return (
        <div className='mainPageContainer'>
            <div className='mainWrapper'>
                <ThemeSelector />
                <SearchSection />
                <ResultsSection setCloseDetail={setCloseDetail} />
            </div>
            <Outlet />
        </div>
    );
};

export default MainPage;
