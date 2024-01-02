import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { cityModel } from "../../views/weatherView/components/search/models/search.model";

const initialState: cityModel = {
  currentCity: {}
};

const citySlice = createSlice({
  name: 'city',
  initialState: initialState,

  // actions to change the state
  reducers: {
    onChangeCurrentCity: (state, action: PayloadAction<cityModel>) => {
      state.currentCity = action.payload.currentCity;
    },
  }
});

export const {
  onChangeCurrentCity
} = citySlice.actions;
export default citySlice.reducer;