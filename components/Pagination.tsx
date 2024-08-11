'use client'
import React from "react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
    const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

    return (
        <div className="pagination">
            {pageNumbers.map((pageNumber) => (
                <button
                    key={pageNumber}
                    onClick={() => onPageChange(pageNumber)}
                    className={pageNumber === currentPage ? 'active' : ''}
                >
                    {pageNumber}
                </button>
            ))}
        </div>
    );
};

export default Pagination;
