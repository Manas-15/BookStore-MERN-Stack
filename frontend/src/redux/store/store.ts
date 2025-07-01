// store/store.js
import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import rootReducer from '../rootReducers';
import { authBaseApi } from './base/authBaseApi';
import { usersBaseApi } from './base/usersBaseApi';

// Load state from localStorage
const loadStateFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadStateFromLocalStorage(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersBaseApi.middleware,
      authBaseApi.middleware
    )
});

// Save state to localStorage whenever store updates
store.subscribe(() => {
  try {
    if (typeof window !== 'undefined') {
      const serializedState = JSON.stringify(store.getState());
      localStorage.setItem('reduxState', serializedState);
    }
  } catch (err) {
    console.error('Error saving state:', err);
  }
});

setupListeners(store.dispatch);
export default store;
