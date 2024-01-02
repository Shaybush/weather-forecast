import { createSlice } from "@reduxjs/toolkit";

interface ITempUnitModel {
  unitMetric: boolean;
}

const initialState: ITempUnitModel = {
  unitMetric: false
};

const tempUnitSlice = createSlice({
  name: 'tempUnit',
  initialState: initialState,

  // actions to change the state
  reducers: {
    onToggleUnit: (state) => {
      state.unitMetric = !state.unitMetric;
    },

    onTurnToCelsius: (state) => {
      state.unitMetric = true;
    },

    onTurnToFahrenheit: (state) => {
      state.unitMetric = false;
    }
  }
});

export const {
  onToggleUnit,
  onTurnToCelsius,
  onTurnToFahrenheit
} = tempUnitSlice.actions;
export default tempUnitSlice.reducer;