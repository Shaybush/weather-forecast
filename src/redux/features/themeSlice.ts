import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { ETheme, IThemeModel } from "../models/theme.model";

const initialState: IThemeModel = {
  themeMode: localStorage['theme'] || ETheme.DARK
};

const themeSlice = createSlice({
  name: 'theme',
  initialState: initialState,

  // actions to change the state
  reducers: {
    onSwitchTheme: (state, action: PayloadAction<IThemeModel>) => {
      const theme = action.payload.themeMode;

      state.themeMode = theme;
      document.documentElement.setAttribute('data-theme', theme);
      localStorage.setItem('theme', JSON.stringify(theme));
    }
  }
});

export const {
  onSwitchTheme
} = themeSlice.actions;
export default themeSlice.reducer;