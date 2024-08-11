// // __tests__/ResultsSection.test.tsx
// import React from 'react';
// import { render, screen, waitFor, fireEvent } from '@testing-library/react';
// import { Provider } from 'react-redux';
// import { setupStore } from '../../store'; // Ensure you import setupStore
// import ResultsSection from '../../components/ResultsSection';
// import { useDispatch } from 'react-redux';
// import { useRouter } from 'next/router';



// jest.mock('react-redux', () => ({
//     ...jest.requireActual('react-redux'),
//     useDispatch: jest.fn(),
// }));

// jest.mock('next/router', () => ({
//     useRouter: jest.fn(),
// }));

// const createMockStore = (preloadedState: any) => {
//     return setupStore(preloadedState);
// };

// describe('ResultsSection Component', () => {
//     let store: ReturnType<typeof createMockStore>;

//     beforeEach(() => {
//         store = createMockStore({
//             theme: {
//                 theme: 'light',
//             },
//             character: {
//                 items: [],
//                 selectedCharacter: null,
//                 closeDetail: true,
//                 selectedItems: [],
//             },
//             search: {
//                 searchTerm: '',
//             },
//             pagination: {
//                 currentPage: 1,
//             },
//         });

//         (useRouter as jest.Mock).mockReturnValue({
//             query: {},
//             push: jest.fn(),
//             pathname: '/current-path',
//         });

//         jest.clearAllMocks();
//     });

//     it('renders loader while fetching data', async () => {
//         global.fetch = jest.fn(() =>
//             Promise.resolve({
//                 ok: true,
//                 json: () => Promise.resolve({ count: 0, next: null, previous: null, results: [] }),
//             } as Response)
//         );

//         render(
//             <Provider store={store}>
//                 <ResultsSection />
//             </Provider>
//         );

//         expect(screen.getByRole('status')).toBeInTheDocument();

//         await waitFor(() => expect(global.fetch).toHaveBeenCalled());
//     });

//     it('renders results and pagination after fetching data', async () => {
//         global.fetch = jest.fn(() =>
//             Promise.resolve({
//                 ok: true,
//                 json: () => Promise.resolve({
//                     count: 20,
//                     next: 'next-url',
//                     previous: null,
//                     results: [{ name: 'Luke Skywalker' }],
//                 }),
//             } as Response)
//         );

//         render(
//             <Provider store={store}>
//                 <ResultsSection />
//             </Provider>
//         );

//         await waitFor(() => expect(screen.getByText('Luke Skywalker')).toBeInTheDocument());
//         expect(screen.getByText('Search Results')).toBeInTheDocument();
//         expect(screen.getByRole('button', { name: /1/i })).toBeInTheDocument();
//     });

//     it('handles page change correctly', async () => {
//         const mockPush = jest.fn();
//         (useRouter as jest.Mock).mockReturnValue({
//             push: mockPush,
//             pathname: '/current-path',
//             query: { page: '2' },
//         });

//         global.fetch = jest.fn(() =>
//             Promise.resolve({
//                 ok: true,
//                 json: () => Promise.resolve({
//                     count: 20,
//                     next: 'next-url',
//                     previous: null,
//                     results: [{ name: 'Luke Skywalker' }],
//                 }),
//             } as Response)
//         );

//         render(
//             <Provider store={store}>
//                 <ResultsSection />
//             </Provider>
//         );

//         await waitFor(() => screen.getByText('Luke Skywalker'));

//         fireEvent.click(screen.getByRole('button', { name: /2/i }));
//         expect(mockPush).toHaveBeenCalledWith('/?page=2', undefined, { shallow: true });
//     });

//     it('handles card click correctly', async () => {
//         const mockDispatch = jest.fn();
//         (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);

//         global.fetch = jest.fn(() =>
//             Promise.resolve({
//                 ok: true,
//                 json: () => Promise.resolve({
//                     count: 20,
//                     next: 'next-url',
//                     previous: null,
//                     results: [{ name: 'Luke Skywalker' }],
//                 }),
//             } as Response)
//         );

//         render(
//             <Provider store={store}>
//                 <ResultsSection />
//             </Provider>
//         );

//         await waitFor(() => screen.getByText('Luke Skywalker'));

//         fireEvent.click(screen.getByText('Luke Skywalker'));

//         expect(mockDispatch).toHaveBeenCalled();
//     });
// });
