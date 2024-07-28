import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchState {
  searchTerm: string;
}

const initialState: SearchState = {
  searchTerm: localStorage.getItem('searchTerm') || '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchTerm: (state, action: PayloadAction<string>) => {
      state.searchTerm = action.payload;
      localStorage.setItem('searchTerm', action.payload);
    },
  },
});

export const { setSearchTerm } = searchSlice.actions;
export default searchSlice.reducer;
