import { configureStore } from '@reduxjs/toolkit';
import psikotesReducer from '../features/psikotes/psikotesSlice';
import sectionReducer from '../features/section/sectionSlice';

export default configureStore({
  reducer: {
    psikotes: psikotesReducer,
    section: sectionReducer,
  },
});
