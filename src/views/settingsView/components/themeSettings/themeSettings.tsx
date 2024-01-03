import { ChangeEvent } from "react";
import { onSwitchTheme } from "../../../../redux/features/themeSlice";
import { useAppDispatch } from "../../../../redux/hooks";
import { ETheme } from "../../../../redux/models/theme.model";
import RadioButton from "../../../../shared/components/radioButton/radioButton";

const ThemeSettings = () => {
  const dispatch = useAppDispatch();

  const switchLight = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(onSwitchTheme({ themeMode: event.target.value as ETheme }));
  };

  return (
    <div>
      <h3 className="text-mute">Theme preferences</h3>
      <hr className="text-mute" />
      <p className="text-mute">
        Choose how Weather app looks to you. Select a single theme, or sync with
        your system and automatically dark mode.
      </p>
      <h5 className="text-primary">Theme mode</h5>

      <div>
        {/* light mode */}
        <RadioButton
          name="themeMode"
          onChange={(e) => switchLight(e)}
          text="Light"
          value={ETheme.LIGHT}
        />

        {/* dark mode */}
        <RadioButton
          name="themeMode"
          onChange={(e) => switchLight(e)}
          text="Dark"
          value={ETheme.DARK}
        />

        {/* green mode */}
        <RadioButton
          name="themeMode"
          onChange={(e) => switchLight(e)}
          text="Lime"
          value={ETheme.GREEN}
        />
      </div>
    </div>
  );
};

export default ThemeSettings;
