import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Art } from '../../types/arts';

type CurrentPageState = {
  currentPage: number;
  searchPages: Art[];
  items: Art[];
  status: 'loading' | 'success' | 'error';
};

const initialState: CurrentPageState = {
  currentPage: 1,
  searchPages: [],
  items: [],
  status: 'loading',
};

export const getTotalPages = createAsyncThunk<Art[], void>(
  'currentPage/getTotalPages',
  async () => {
    const { data } = await axios.get<Art[]>(
      `https://test-front.framework.team/paintings`
    );

    return data;
  }
);

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
  extraReducers: (builder) => {
    builder
      .addCase(getTotalPages.pending, (state) => {
        state.status = 'loading';
        state.items = [];
      })
      .addCase(
        getTotalPages.fulfilled,
        (state, action: PayloadAction<Art[]>) => {
          state.status = 'success';
          state.items = action.payload;
        }
      )
      .addCase(getTotalPages.rejected, (state) => {
        state.status = 'error';
        state.items = [];
      });
  },
});

export const { setCurrentPage, setTotalPage } = currentPageSlice.actions;
export default currentPageSlice.reducer;
