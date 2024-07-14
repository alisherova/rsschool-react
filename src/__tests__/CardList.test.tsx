import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import ResultsSection from '../../components/ResultsSection';

const mockResults = [
    {
        id: "Luke Skywalker",
        name: 'Luke Skywalker',
    },
];

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ results: mockResults }),
    })
) as jest.Mock;

const mockOnCardClick = jest.fn();
const setCloseDetail = jest.fn();

describe('ResultsSection Component', () => {
    it('renders search results correctly', async () => {
        render(
            <Router>
                <ResultsSection changeName={mockOnCardClick} setCloseDetail={setCloseDetail} />
            </Router>
        );

        await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument());
    });


    it('displays a loading indicator while fetching data', async () => {
        render(
            <Router>
                <ResultsSection changeName={mockOnCardClick} setCloseDetail={setCloseDetail} />
            </Router>
        );
        expect(screen.getByRole('status')).toBeInTheDocument();

        await waitFor(() => expect(screen.queryByRole('status')).not.toBeInTheDocument());

    });

    it('displays an error message if the fetch fails', async () => {
        (global.fetch as jest.Mock).mockImplementationOnce(() =>
            Promise.reject('API is down')
        );

        render(
            <Router>
                <ResultsSection changeName={mockOnCardClick} setCloseDetail={setCloseDetail} />
            </Router>
        );

        await waitFor(() => expect(screen.getByText(/error/i)).toBeInTheDocument());
    });
});
