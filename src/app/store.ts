import { configureStore } from "@reduxjs/toolkit";
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

export type RootState = ReturnType<typeof store.getState>

export default store;
