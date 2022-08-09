import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';


export const quizzesSlice = createSlice({
  name: 'quizzes',
  initialState: {} as Quizzes,
  reducers: {
    addQuiz(state, action: PayloadAction<Quiz>) {
      state[action.payload.id] = action.payload;
    }
  }
});

export const selectQuizzes = (state: RootState) => state.quizzes;
export const { addQuiz } = quizzesSlice.actions;
export default quizzesSlice.reducer;