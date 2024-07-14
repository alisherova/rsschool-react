import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Pagination from '../../components/Pagination';
import { MemoryRouter, Route } from 'react-router-dom';

describe('Pagination Component', () => {
    const onPageChange = jest.fn();
    it('updates URL query parameter when page changes', () => {
        render(
            <MemoryRouter initialEntries={['/search?page=1']}>
                <Route path="/search">
                    <Pagination currentPage={1} totalPages={5} onPageChange={onPageChange} />
                </Route>
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('2'));
        expect(window.location.search).toBe('?page=2');
    });
});
