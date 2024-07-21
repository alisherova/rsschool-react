import React from 'react';
import { render, screen, waitFor, fireEvent, act } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResultsSection from '../../components/ResultsSection';
import '@testing-library/jest-dom';
import useSearchQuery from '../../hooks/useSearchQuery';

// Mock the useSearchQuery hook
jest.mock('../../hooks/useSearchQuery', () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Mock global fetch
const mockFetch = jest.fn();
global.fetch = mockFetch;

describe('ResultsSection Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useSearchQuery as jest.Mock).mockReturnValue(['Luke']);
    });

    it('renders loader while fetching data', async () => {
        mockFetch.mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ count: 0, next: null, previous: null, results: [] }),
            } as Response)
        );

        render(
            <Router>
                <ResultsSection changeName={jest.fn()} setCloseDetail={jest.fn()} />
            </Router>
        );

        expect(screen.getByRole('status')).toBeInTheDocument();

        await waitFor(() => expect(mockFetch).toHaveBeenCalled());
    });

    it('renders results and pagination after fetching data', async () => {
        mockFetch.mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    count: 20,
                    next: 'next-url',
                    previous: null,
                    results: [{ name: 'Luke Skywalker' }],
                }),
            } as Response)
        );

        render(
            <Router>
                <ResultsSection changeName={jest.fn()} setCloseDetail={jest.fn()} />
            </Router>
        );

        await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument());
        expect(screen.getByText('Search Results')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /1/i })).toBeInTheDocument(); // Pagination button
    });

    it('handles page change correctly', async () => {
        const mockNavigate = jest.fn();
        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        mockFetch.mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    count: 20,
                    next: 'next-url',
                    previous: null,
                    results: [{ name: 'Luke Skywalker' }],
                }),
            } as Response)
        );

        render(
            <Router>
                <ResultsSection changeName={jest.fn()} setCloseDetail={jest.fn()} />
            </Router>
        );

        await waitFor(() => screen.getByText('Luke Skywalker'));

        fireEvent.click(screen.getByRole('button', { name: /2/i })); // Click on page 2

    });

    it('handles card click correctly', async () => {
        const mockChangeName = jest.fn();
        const mockSetCloseDetail = jest.fn();
        const mockNavigate = jest.fn();

        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        mockFetch.mockImplementation(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({
                    count: 20,
                    next: 'next-url',
                    previous: null,
                    results: [{ name: 'Luke Skywalker' }],
                }),
            } as Response)
        );

        render(
            <Router>
                <ResultsSection
                    changeName={mockChangeName}
                    setCloseDetail={mockSetCloseDetail}
                />
            </Router>
        );

        await waitFor(() => screen.getByText('Luke Skywalker'));

        fireEvent.click(screen.getByText('Luke Skywalker'));

        expect(mockChangeName).toHaveBeenCalledWith('Luke Skywalker');
        expect(mockSetCloseDetail).toHaveBeenCalledWith(true);
    });
});
