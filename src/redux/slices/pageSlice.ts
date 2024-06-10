import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import type { Art } from '../../types/arts';

export interface CurrentPageState {
  currentPage: number;
  searchPages: Art[];
}

const initialState: CurrentPageState = {
  currentPage: 1,
  searchPages: [],
};

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    setTotalPage: (state, action: PayloadAction<Art[]>) => {
      state.searchPages = action.payload;
    },
  },
});

export const { setCurrentPage, setTotalPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
