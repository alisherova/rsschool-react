import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore, { MockStore } from 'redux-mock-store';
import ResultsSection from '../../components/ResultsSection';
import { RootState } from '../../store';
import { apiSlice } from '../../store/apiSlice';

const mockStore = configureStore<RootState>([]);

describe('ResultsSection Component', () => {
    let store: MockStore<RootState>;

    beforeEach(() => {
        store = mockStore({
            theme: {
                theme: 'light',
            },
            character: {
                items: [],
                selectedCharacter: null,
                closeDetail: true,
                selectedItems: [],
            },
            search: {
                searchTerm: '',
            },
            [apiSlice.reducerPath]: {
                queries: {},
                mutations: {},
                provided: {},
                subscriptions: {},
                config: {
                    reducerPath: apiSlice.reducerPath,
                    refetchOnMountOrArgChange: false,
                    refetchOnReconnect: false,
                    refetchOnFocus: false,
                    online: true,
                    focused: true,
                    middlewareRegistered: true,
                    keepUnusedDataFor: 60,
                    invalidationBehavior: "delayed",
                },
            },
        });

        jest.clearAllMocks();
    });

    it('renders loader while fetching data', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ count: 0, next: null, previous: null, results: [] }),
            } as Response)
        );

        render(
            <Provider store={store}>
                <Router>
                    <ResultsSection setCloseDetail={jest.fn()} />
                </Router>
            </Provider>
        );

        expect(screen.getByRole('status')).toBeInTheDocument();

        await waitFor(() => expect(global.fetch).toHaveBeenCalled());
    });

    it('renders results and pagination after fetching data', async () => {
        global.fetch = jest.fn(() =>
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
            <Provider store={store}>
                <Router>
                    <ResultsSection setCloseDetail={jest.fn()} />
                </Router>
            </Provider>
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

        global.fetch = jest.fn(() =>
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
            <Provider store={store}>
                <Router>
                    <ResultsSection setCloseDetail={jest.fn()} />
                </Router>
            </Provider>
        );

        await waitFor(() => screen.getByText('Luke Skywalker'));

        fireEvent.click(screen.getByRole('button', { name: /2/i }));
    });

    it('handles card click correctly', async () => {
        const mockChangeName = jest.fn();
        const mockSetCloseDetail = jest.fn();
        const mockNavigate = jest.fn();

        jest.mock('react-router-dom', () => ({
            ...jest.requireActual('react-router-dom'),
            useNavigate: () => mockNavigate,
        }));

        global.fetch = jest.fn(() =>
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
            <Provider store={store}>
                <Router>
                    <ResultsSection
                        setCloseDetail={mockSetCloseDetail}
                    />
                </Router>
            </Provider>
        );

        await waitFor(() => screen.getByText('Luke Skywalker'));

        fireEvent.click(screen.getByText('Luke Skywalker'));

        expect(mockChangeName).toHaveBeenCalledWith('Luke Skywalker');
        expect(mockSetCloseDetail).toHaveBeenCalledWith(true);
    });
});
