'use client'
import React from 'react';
import { useAppDispatch, useAppSelector } from '../hooks';
import { unselectAllItems } from '../store/characterSlice';
import { saveAsCsv } from '../utils/csvUtils';

const Flyout: React.FC = () => {
    const dispatch = useAppDispatch();
    const selectedItems = useAppSelector((state) => state.character.selectedItems);

    const handleUnselectAll = () => {
        dispatch(unselectAllItems());
    };

    const handleDownload = () => {
        const selectedData = selectedItems.map((singleCharacter) => ({
            name: singleCharacter.name,
            height: singleCharacter.height,
            mass: singleCharacter.mass,
            hair_color: singleCharacter.hair_color,
            skin_color: singleCharacter.skin_color,
            eye_color: singleCharacter.eye_color,
            birth_year: singleCharacter.birth_year,
            gender: singleCharacter.gender
        }));
        saveAsCsv(selectedData, Object.keys(selectedItems).length);
    };

    return (
        <div className="flyout">
            <p>{Object.keys(selectedItems).length} items are selected</p>
            <button onClick={handleUnselectAll}>Unselect all</button>
            <button onClick={handleDownload}>Download</button>
        </div>
    );
};

export default Flyout;
