import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { setTheme, Theme } from '../store/themeSlice';
import { RootState } from '../store';

const ThemeSelector: React.FC = () => {
    const dispatch = useAppDispatch();
    const theme = useAppSelector((state: RootState) => state.theme.theme);
    console.log(theme);
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedTheme = event.target.value as Theme;
        dispatch(setTheme(selectedTheme));
    };

    return (
        <div className='theme-selector'>
            <label>
                <input
                    type="radio"
                    value="light"
                    checked={theme === 'light'}
                    onChange={handleChange}
                />
                Light
            </label>
            <label>
                <input
                    type="radio"
                    value="dark"
                    checked={theme === 'dark'}
                    onChange={handleChange}
                />
                Dark
            </label>
        </div>
    );
};

export default ThemeSelector;
