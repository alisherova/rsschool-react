import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import SearchSection from '../../components/SearchSection';
import useSearchQuery from '../../hooks/useSearchQuery';
import { useSearchParams } from 'react-router-dom';

// Mock the useSearchQuery hook
jest.mock('../../hooks/useSearchQuery', () => ({
    __esModule: true,
    default: jest.fn(),
}));

// Mock the useSearchParams hook
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useSearchParams: jest.fn(),
}));

describe('SearchSection Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (useSearchQuery as jest.Mock).mockReturnValue(['', jest.fn(), jest.fn()]);
        (useSearchParams as jest.Mock).mockReturnValue([new URLSearchParams(), jest.fn()]);
    });

    it('renders input field and button', () => {
        render(<SearchSection onSearch={jest.fn()} />);

        expect(screen.getByPlaceholderText('Enter search term...')).toBeInTheDocument();
    });

    it('updates search term on input change', async () => {
        const mockSetSearchTermWithUrlUpdate = jest.fn();
        (useSearchQuery as jest.Mock).mockReturnValue(['', jest.fn(), mockSetSearchTermWithUrlUpdate]);

        render(<SearchSection onSearch={jest.fn()} />);

        fireEvent.change(screen.getByPlaceholderText('Enter search term...'), {
            target: { value: 'Luke' },
        });

        await waitFor(() => {
            expect(mockSetSearchTermWithUrlUpdate).toHaveBeenCalledWith('Luke');
        });
    });

    it('calls onSearch with current search term when button is clicked', () => {
        const mockOnSearch = jest.fn();
        (useSearchQuery as jest.Mock).mockReturnValue(['Luke', jest.fn(), jest.fn()]);

        render(<SearchSection onSearch={mockOnSearch} />);
    });

    it('debounces input changes', async () => {
        jest.useFakeTimers();

        const mockSetSearchTermWithUrlUpdate = jest.fn();
        (useSearchQuery as jest.Mock).mockReturnValue(['', jest.fn(), mockSetSearchTermWithUrlUpdate]);

        render(<SearchSection onSearch={jest.fn()} />);

        fireEvent.change(screen.getByPlaceholderText('Enter search term...'), {
            target: { value: 'Luke' },
        });

        jest.advanceTimersByTime(500); // Fast-forward the debounce timer

        await waitFor(() => {
            expect(mockSetSearchTermWithUrlUpdate).toHaveBeenCalledWith('Luke');
        });

        jest.useRealTimers();
    });
});
