import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import psikotesReducer from '../features/psikotes/psikotesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    psikotes: psikotesReducer,
  },
});
