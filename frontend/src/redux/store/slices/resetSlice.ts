// resetSlice.ts
import { createSlice } from '@reduxjs/toolkit';

const resetSlice = createSlice({
  name: 'reset',
  initialState: {},
  reducers: {
    resetStore: () => ({}) // Reset state to an empty object
  }
});

// Make sure you're exporting the actions object (resetStore)
export const { resetStore } = resetSlice.actions;
export default resetSlice.reducer;
