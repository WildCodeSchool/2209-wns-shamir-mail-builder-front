import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: any = [];
export const slidebarSlice = createSlice({
  name: 'sidebarOptions',
  initialState,
  reducers: {
    setSelectedComponent: (state, action: PayloadAction<any>) => {
      state.splice(0, 1, action.payload);
    },
    resetSelectedComponent: (state) => {
      state.splice(0, 1);
    },
    updateSelectedComponent: (state, action: PayloadAction<any>) => {
      state[0] = action.payload;
    },
  },
});
export const { setSelectedComponent, resetSelectedComponent, updateSelectedComponent } = slidebarSlice.actions;
export default slidebarSlice.reducer;
