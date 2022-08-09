import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {
    'test-card-0': {
      id: 'test-card-0',
      front: 'Question1',
      back: 'Answer1'
    },
    'test-card-1': {
      id: 'test-card-1',
      front: 'Question2',
      back: 'Answer2'
    }
  } as Cards,
  reducers: {
    addCards(state, action: PayloadAction<Cards>) {
      for (const key of Object.keys(action.payload)) {
        state[key] = action.payload[key];
      }
    }
  }
});

export const selectCards = (state: RootState) => state.cards;
export const { addCards } = cardsSlice.actions;
export default cardsSlice.reducer;