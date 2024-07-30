import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PaginationState {
  currentPage: number;
}

const initialState: PaginationState = {
  currentPage: 1,
};

const PaginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
});

export const { setPage } = PaginationSlice.actions;
export default PaginationSlice.reducer;
