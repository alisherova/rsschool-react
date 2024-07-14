import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Card from '../../components/CharacterDetail';
import { MemoryRouter } from 'react-router-dom';

interface DetailedCharacterName {
    detailedCharacterName: string | undefined;
    setCloseDetail?: (condition: boolean) => void;
}


describe('Card Component', () => {
    const setCloseDetail = jest.fn();
    const mockCard: DetailedCharacterName = { detailedCharacterName: 'Card 1', setCloseDetail: setCloseDetail };

    it('renders the relevant card data', () => {
        render(
            <MemoryRouter>
                <Card detailedCharacterName={mockCard} onClick={setCloseDetail} />
            </MemoryRouter>
        );
        expect(screen.getByText('Card 1')).toBeInTheDocument();
    });

    it('clicking on a card opens a detailed card component', () => {
        render(
            <MemoryRouter>
                <Card detailedCharacterName={mockCard} onClick={setCloseDetail} />
            </MemoryRouter>
        );
        fireEvent.click(screen.getByText('Card 1'));
        expect(setCloseDetail).toHaveBeenCalled();
    });
});
