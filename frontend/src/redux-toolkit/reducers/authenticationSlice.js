import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Auth } from 'aws-amplify';
import { onError } from '../../lib/errorLib';

const initialState = {
  isAuthenticated: false,
  isAuthenticating: true,
};

// Thunk middleware
export const loadSession = createAsyncThunk(
  'authentication/loadSession',
  async (_, { dispatch }) => {
    try {
      await Auth.currentSession();
      dispatch(setIsAuthenticated(true));
    } catch (e) {
      if (e !== 'No current user') {
        onError(e);
      }
    }

    dispatch(setIsAuthenticating(false));
  }
);

export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    setIsAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
    setIsAuthenticating: (state, action) => {
      state.isAuthenticating = action.payload;
    },
  },
});

export const { setIsAuthenticated, setIsAuthenticating } =
  authenticationSlice.actions;

export default authenticationSlice.reducer;
