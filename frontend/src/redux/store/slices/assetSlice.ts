// tenantSlice.ts
import { createSlice } from '@reduxjs/toolkit';

interface AssetState {
  tenantInfo: null;
}

const initialState: AssetState = {
  tenantInfo: null
};

const assetSlice = createSlice({
  name: 'assetSlice',
  initialState,
  reducers: {
    setTenantInfo: (state, action) => {
      state.tenantInfo = action.payload?.tenants?.[0];
    },
    resetTenantInfo: () => initialState
  }
});

export const { setTenantInfo, resetTenantInfo } = assetSlice.actions;
export default assetSlice.reducer;
