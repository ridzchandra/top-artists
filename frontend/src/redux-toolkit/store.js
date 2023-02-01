import { configureStore } from '@reduxjs/toolkit';
import authentication from './reducers/authenticationSlice';

export default configureStore({
  reducer: {
    authentication,
  },
});
