import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchSection from '../../components/SearchSection';
import { MemoryRouter } from 'react-router-dom';

describe('SearchSection Component', () => {
    it('saves the entered value to the local storage', () => {
        render(
            <MemoryRouter>
                <SearchSection onSearch={jest.fn()} />
            </MemoryRouter>
        );
        const input = screen.getByPlaceholderText('Enter search term...');
        fireEvent.change(input, { target: { value: 'test search' } });
        fireEvent.click(screen.getByRole('button'));
        expect(localStorage.getItem('searchTerm')).toBe('test search');
    });

    it('retrieves the value from the local storage upon mounting', () => {
        localStorage.setItem('searchTerm', 'saved search');
        render(
            <MemoryRouter>
                <SearchSection onSearch={jest.fn()} />
            </MemoryRouter>
        );
        expect(screen.getByPlaceholderText('Enter search term...').value).toBe('saved search');
    });
});
