import { configureStore } from "@reduxjs/toolkit";
import type { PreloadedState } from '@reduxjs/toolkit'
import cardsReducer from '../features/cards/cardsSlice';
import quizzesReducer from '../features/quizzes/quizzesSlice';
import topicsReducer from '../features/topics/topicsSlice';

const store = configureStore({
  reducer: {
    cards: cardsReducer,
    quizzes: quizzesReducer,
    topics: topicsReducer
  },
});

export const setupStore = (preloadedState?: PreloadedState<RootState>) => {
  return configureStore({
    reducer: {
      cards: cardsReducer,
      quizzes: quizzesReducer,
      topics: topicsReducer
    },
    preloadedState
  })
}

export type RootState = ReturnType<typeof store.getState>

export default store;
