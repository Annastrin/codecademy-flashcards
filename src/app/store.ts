import { configureStore } from "@reduxjs/toolkit";
import topicsReducer from '../features/topics/topicsSlice';

const store = configureStore({
  reducer: {
    topics: topicsReducer
  },
});

export type RootState = ReturnType<typeof store.getState>

export default store;
