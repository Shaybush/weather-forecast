import { ChangeEvent } from "react";
import { onSwitchTheme } from "../../../../redux/features/themeSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { ETheme } from "../../../../redux/models/theme.model";
import RadioButton from "../../../../shared/components/radioButton/radioButton";
import { radioButtonsConfig } from "../../config/themeSettings.config";

const ThemeSettings = () => {
  const dispatch = useAppDispatch();
  const { themeMode } = useAppSelector((state) => state.themeSlice);

  const switchLight = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(onSwitchTheme({ themeMode: event.target.value as ETheme }));
  };

  return (
    <div className="mb-4">
      { themeMode }
      <h3 className="text-mute">Theme preferences</h3>
      <hr className="text-mute" />
      <p className="text-mute">
        Choose how Weather app looks to you. Select a single theme, or sync with
        your system and automatically dark mode.
      </p>
      <h4 className="text-mute font-weight-bold mb-3">Theme mode</h4>

      {radioButtonsConfig.map(btn => (
        <RadioButton
          name="themeMode"
          key={btn.id}
          onChange={(e) => switchLight(e)}
          text={btn.text}
          value={btn.value}
          checked = {themeMode == btn.id}
        />
      ))}
    </div>
  );
};

export default ThemeSettings;
