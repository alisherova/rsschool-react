import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Pagination from '../../components/Pagination'; // Adjust the import path if needed

describe('Pagination Component', () => {
    it('renders the correct number of page buttons', () => {
        render(
            <Pagination currentPage={1} totalPages={5} onPageChange={() => { }} />
        );

        // Check if there are 5 buttons rendered
        const buttons = screen.getAllByRole('button');
        expect(buttons).toHaveLength(5);
    });

    it('highlights the current page button', () => {
        render(
            <Pagination currentPage={3} totalPages={5} onPageChange={() => { }} />
        );

        // Find the button with the current page number
        const currentPageButton = screen.getByText('3');
        expect(currentPageButton).toHaveClass('active');
    });

    it('calls onPageChange with the correct page number when a button is clicked', () => {
        const onPageChangeMock = jest.fn();
        render(
            <Pagination currentPage={1} totalPages={5} onPageChange={onPageChangeMock} />
        );

        // Click on the button for page 3
        fireEvent.click(screen.getByText('3'));

        // Check if the mock function was called with the correct page number
        expect(onPageChangeMock).toHaveBeenCalledWith(3);
    });

    it('does not highlight buttons for pages that are not the current page', () => {
        render(
            <Pagination currentPage={2} totalPages={5} onPageChange={() => { }} />
        );

        // Find the button for page 1 and page 3
        const page1Button = screen.getByText('1');
        const page3Button = screen.getByText('3');

        // Check if they do not have the 'active' class
        expect(page1Button).not.toHaveClass('active');
        expect(page3Button).not.toHaveClass('active');
    });
});
