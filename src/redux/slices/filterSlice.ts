import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type FilterSliceState = {
  searchValue: string;
  valueAuthor: string;
  valueLocation: string;
  valueAgeFrom: string;
  valueAgeTo: string;
  visibleTitle: boolean;
  isOpen: boolean;
};

const initialState: FilterSliceState = {
  searchValue: '',
  valueAuthor: '',
  valueLocation: '',
  valueAgeFrom: '',
  valueAgeTo: '',
  visibleTitle: false,
  isOpen: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setValueAuthor(state, action: PayloadAction<string>) {
      state.valueAuthor = action.payload;
    },
    setValueLocation(state, action: PayloadAction<string>) {
      state.valueLocation = action.payload;
    },
    setValueAgeFrom(state, action: PayloadAction<string>) {
      state.valueAgeFrom = action.payload;
    },
    setValueAgeTo(state, action: PayloadAction<string>) {
      state.valueAgeTo = action.payload;
    },
    setVisibleTitle(state, action: PayloadAction<boolean>) {
      state.visibleTitle = action.payload;
    },

    setIsOpen(state, action: PayloadAction<boolean>) {
      state.isOpen = action.payload;
    },
  },
});

export const {
  setSearchValue,
  setVisibleTitle,
  setIsOpen,
  setValueLocation,
  setValueAuthor,
  setValueAgeFrom,
  setValueAgeTo,
} = filterSlice.actions;
export default filterSlice.reducer;
