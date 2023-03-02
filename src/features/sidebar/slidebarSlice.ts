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
  },
});
export const { setSelectedComponent, resetSelectedComponent } = slidebarSlice.actions;
export default slidebarSlice.reducer;
