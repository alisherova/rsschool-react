import React, { createContext, useContext, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Theme, setTheme } from '../../store/themeSlice';
import { useAppDispatch, useAppSelector } from '../../hooks';

interface ThemeProviderProps {
    children: React.ReactNode;
}

const ThemeContext = createContext<{ theme: Theme }>({ theme: 'light' });

export const useTheme = () => useContext(ThemeContext);

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    const theme = useAppSelector((state: RootState) => state.theme.theme);
    const dispatch = useAppDispatch()
    useEffect(() => {
        const savedTheme = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
        if (savedTheme) {
            dispatch(setTheme(savedTheme as 'light' | 'dark'));
        }
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
    }, [theme]);

    return (
        <ThemeContext.Provider value={{ theme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;
