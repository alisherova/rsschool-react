// import React from 'react';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import '@testing-library/jest-dom';
// import SearchSection from '../../components/SearchSection';
// import useSearchQuery from '../../hooks/useSearchQuery';

// jest.mock('../../hooks/useSearchQuery', () => ({
//     __esModule: true,
//     default: jest.fn(),
// }));

// jest.mock('react-router-dom', () => ({
//     ...jest.requireActual('react-router-dom'),
//     useSearchParams: jest.fn(),
// }));

// describe('SearchSection Component', () => {
//     beforeEach(() => {
//         jest.clearAllMocks();
//         (useSearchQuery as jest.Mock).mockReturnValue(['', jest.fn(), jest.fn()]);
//     });

//     it('renders input field and button', () => {
//         render(<SearchSection />);

//         expect(screen.getByPlaceholderText('Enter search term...')).toBeInTheDocument();
//     });

//     it('updates search term on input change', async () => {
//         const mockSetSearchTermWithUrlUpdate = jest.fn();
//         (useSearchQuery as jest.Mock).mockReturnValue(['', jest.fn(), mockSetSearchTermWithUrlUpdate]);

//         render(<SearchSection />);

//         fireEvent.change(screen.getByPlaceholderText('Enter search term...'), {
//             target: { value: 'Luke' },
//         });

//         await waitFor(() => {
//             expect(mockSetSearchTermWithUrlUpdate).toHaveBeenCalledWith('Luke');
//         });
//     });

//     it('calls onSearch with current search term when button is clicked', () => {
//         const mockOnSearch = jest.fn();
//         (useSearchQuery as jest.Mock).mockReturnValue(['Luke', jest.fn(), jest.fn()]);

//         render(<SearchSection />);
//     });

//     it('debounces input changes', async () => {
//         jest.useFakeTimers();

//         const mockSetSearchTermWithUrlUpdate = jest.fn();
//         (useSearchQuery as jest.Mock).mockReturnValue(['', jest.fn(), mockSetSearchTermWithUrlUpdate]);

//         render(<SearchSection />);

//         fireEvent.change(screen.getByPlaceholderText('Enter search term...'), {
//             target: { value: 'Luke' },
//         });

//         jest.advanceTimersByTime(500); // Fast-forward the debounce timer

//         await waitFor(() => {
//             expect(mockSetSearchTermWithUrlUpdate).toHaveBeenCalledWith('Luke');
//         });

//         jest.useRealTimers();
//     });
// });
