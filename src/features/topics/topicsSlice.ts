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
    }
  }
});

export const selectTopics = (state: RootState) => state.topics;
export const { addTopic } = topicsSlice.actions;

export default topicsSlice.reducer;