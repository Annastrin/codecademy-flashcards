import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../../app/store';

export const topicsSlice = createSlice({
  name: 'topics',
  initialState: {} as Topics,
  reducers: {
    addTopic(state, action: PayloadAction<Topic>) {
      if (!state[action.payload.id]) {
        state[action.payload.id] = action.payload;
      }
    },
    addQuizId(state, action: PayloadAction<{topicId: string, quizId: string}>) {
      if (state[action.payload.topicId]) {
        state[action.payload.topicId].quizIds.push(action.payload.quizId);
      }
    }
  }
});

export const selectTopics = (state: RootState) => state.topics;
export const { addTopic, addQuizId } = topicsSlice.actions;

export default topicsSlice.reducer;