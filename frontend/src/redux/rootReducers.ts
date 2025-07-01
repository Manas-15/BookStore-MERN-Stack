'use client';

import { combineReducers } from 'redux';
import resetSlice from './store/slices/resetSlice';
import authSlice from './store/slices/authSlice';
import assetSlice from './store/slices/assetSlice';
import { usersApi } from './store/generatedServices/usersApi';
import { authApi } from './store/generatedServices/authApi';

// Combine all reducers into one root reducer
const MainReducer = combineReducers({
  [usersApi.reducerPath]: usersApi.reducer,
  [authApi.reducerPath]: authApi.reducer,

  authSlice: authSlice, // Add reset slice here
  resetSlice: resetSlice, // Add reset slice here
  assetSlice: assetSlice // Add reset slice here
});

// Define the root reducer function
const rootReducer = (state: any, action: any) => {
  if (action.type === 'auth/resetStore') {
    state = undefined; // Reset entire state
  }
  return MainReducer(state, action);
};

export default rootReducer;
