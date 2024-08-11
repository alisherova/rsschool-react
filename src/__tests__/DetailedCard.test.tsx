import React from 'react';
import { screen, waitFor, fireEvent, act } from '@testing-library/react';
import CharacterDetail from '../../components/CharacterDetail';
import '@testing-library/jest-dom';
import { render } from '../../utils/test-utils';

jest.mock('next/router', () => ({
    useRouter: () => ({
        query: { name: 'Luke Skywalker' },
        push: jest.fn(),
    }),
}));

const mockCharacter = {
    name: 'Luke Skywalker',
    height: '172',
    mass: '77',
    hair_color: 'blond',
    skin_color: 'fair',
    eye_color: 'blue',
    birth_year: '19BBY',
    gender: 'male',
};

describe('CharacterDetail Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('renders the loader initially', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ results: [mockCharacter] }),
            } as Response)
        );

        await act(async () => {
            render(<CharacterDetail />);
        });
        await waitFor(() => expect(fetch).toHaveBeenCalledTimes(1));
    });

    it('renders character details after fetching', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ results: [mockCharacter] }),
            } as Response)
        );

        await act(async () => {
            render(<CharacterDetail />);
        });

        await waitFor(() => screen.getByText(/Luke Skywalker/i));

        expect(screen.getByText(/Luke Skywalker/i)).toBeInTheDocument();
        expect(screen.getByText(/Height:/i)).toBeInTheDocument();
        expect(screen.getByText(/172/i)).toBeInTheDocument();
        expect(screen.getByText(/Mass:/i)).toBeInTheDocument();
        expect(screen.getByText(/77/i)).toBeInTheDocument();
        expect(screen.getByText(/Hair Color:/i)).toBeInTheDocument();
        expect(screen.getByText(/blond/i)).toBeInTheDocument();
        expect(screen.getByText(/Skin Color:/i)).toBeInTheDocument();
        expect(screen.getByText(/fair/i)).toBeInTheDocument();
        expect(screen.getByText(/Eye Color:/i)).toBeInTheDocument();
        expect(screen.getByText(/blue/i)).toBeInTheDocument();
        expect(screen.getByText(/Birth Year:/i)).toBeInTheDocument();
        expect(screen.getByText(/19BBY/i)).toBeInTheDocument();
        expect(screen.getByText(/Gender:/i)).toBeInTheDocument();
        expect(screen.getByText(/male/i)).toBeInTheDocument();
    });

    it('navigates to not-found when character is not found', async () => {
        const push = jest.fn();
        jest.mock('next/router', () => ({
            useRouter: () => ({
                query: { name: 'Unknown Character' },
                push,
            }),
        }));

        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ results: [] }),
            } as Response)
        );

        await act(async () => {
            render(<CharacterDetail />);
        });

        await waitFor(() => expect(push).toHaveBeenCalledWith('/not-found'));
    });

    it('calls setCloseDetail and navigates on close button click', async () => {
        global.fetch = jest.fn(() =>
            Promise.resolve({
                ok: true,
                json: () => Promise.resolve({ results: [mockCharacter] }),
            } as Response)
        );
        const setCloseDetailMock = jest.fn();
        const push = jest.fn();
        jest.mock('next/router', () => ({
            useRouter: () => ({
                query: { name: 'Luke Skywalker' },
                push,
            }),
        }));

        await act(async () => {
            render(<CharacterDetail />);
        });

        await waitFor(() => screen.getByText(/Luke Skywalker/i));

        const closeButton = screen.getByTestId('close-button');
        fireEvent.click(closeButton);

        expect(setCloseDetailMock).toHaveBeenCalledWith(true);
        expect(push).toHaveBeenCalledWith('/');
    });
});
