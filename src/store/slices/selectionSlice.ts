import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Item {
  name: string;
  url: string;
}

interface SelectionState {
  items: Item[];
}

const initialState: SelectionState = {
  items: [],
};

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    selectItem: (state, action: PayloadAction<Item>) => {
      if (!state.items.find((item) => item.name === action.payload.name)) {
        state.items.push(action.payload);
      }
    },
    unselectItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.name !== action.payload);
    },
    clearSelection: (state) => {
      state.items = [];
    },
  },
});

export const { selectItem, unselectItem, clearSelection } = selectionSlice.actions;
export default selectionSlice.reducer;