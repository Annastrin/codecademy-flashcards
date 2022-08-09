import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: {
    'test-quiz-0': {
      id: 'test-quiz-0',
      topicId: 'test-topic-0',
      name: 'Harry Potter',
      cardIds: ['test-card-0', 'test-card-1']
    }
  } as Quizzes,
  reducers: {
    addQuiz(state, action: PayloadAction<Quiz>) {
      state[action.payload.id] = action.payload;
    }
  }
});

export const selectQuizzes = (state: RootState) => state.quizzes;
export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;