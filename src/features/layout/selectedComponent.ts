import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LayoutSelected {
  layoutId?: number;
}

const initialState: {
  layoutId?: number;
} = {};

export const layoutSelected = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setSelectedLayout: (state, action: PayloadAction<LayoutSelected>) => {
      state.layoutId = action.payload.layoutId;
    },
    resetSelectedLayout: (state) => {
      state.layoutId = undefined;
    },
  },
});
export const {
  setSelectedLayout,
} = layoutSelected.actions;
export default layoutSelected.reducer;
