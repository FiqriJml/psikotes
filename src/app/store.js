import { configureStore } from '@reduxjs/toolkit';
import psikotesReducer from '../features/psikotes/psikotesSlice';
import sectionReducer from '../features/section/sectionSlice';
import soalReducer from '../features/soal/soalSlice';
import pesertaReducer from '../features/peserta/pesertaSlice';

export default configureStore({
  reducer: {
    psikotes: psikotesReducer,
    section: sectionReducer,
    soal: soalReducer,
    peserta: pesertaReducer,
  },
});
