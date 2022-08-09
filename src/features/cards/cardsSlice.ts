import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export const cardsSlice = createSlice({
  name: 'cards',
  initialState: {} as Cards,
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