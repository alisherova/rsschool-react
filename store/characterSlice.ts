import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Character } from './apiSlice';

interface CharacterState {
  items: Character[];
  selectedCharacter: string | Character | null;
  closeDetail: boolean;
  selectedItems: Character[];
}

const initialState: CharacterState = {
  items: [],
  selectedCharacter: null,
  closeDetail: true,
  selectedItems: [],
};

const characterSlice = createSlice({
  name: 'character',
  initialState,
  reducers: {
    setCharacters(state, action: PayloadAction<Character[]>) {
      state.items = action.payload;
    },
    setSelectedCharacter(
      state,
      action: PayloadAction<string | Character | null>
    ) {
      state.selectedCharacter = action.payload;
    },
    setCloseDetail(state, action: PayloadAction<boolean>) {
      state.closeDetail = action.payload;
    },
    toggleItemSelection: (state, action: PayloadAction<Character>) => {
      const character = action.payload;
      const index = state.selectedItems.findIndex(
        (item) => item.name === character.name
      );
      if (index === -1) {
        state.selectedItems.push(character);
      } else {
        state.selectedItems.splice(index, 1);
      }
    },
    unselectAllItems: (state) => {
      state.selectedItems = [];
    },
    setItemsSelection(state, action: PayloadAction<[]>) {
      state.selectedItems = action.payload;
    },
  },
});

export const {
  setCharacters,
  setSelectedCharacter,
  setCloseDetail,
  toggleItemSelection,
  unselectAllItems,
  setItemsSelection,
} = characterSlice.actions;
export default characterSlice.reducer;
