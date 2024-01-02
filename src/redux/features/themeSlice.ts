import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ETheme, IThemeModel } from "../models/theme.model";

const initialState: IThemeModel = {
  themeMode: ETheme.DARK
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,

  // actions to change the state
  reducers: {
    onSwitchTheme: (state, action: PayloadAction<IThemeModel>) => {
      state.themeMode = action.payload.themeMode;
    }
  }
});

export const {
  onSwitchTheme
} = themeSlice.actions;
export default themeSlice.reducer;