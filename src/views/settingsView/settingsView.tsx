import ThemeSettings from "./components/themeSettings/themeSettings";
import UnitTemperature from "./components/unitTemperature/unitTemperature";

const SettingsView = () => {
  return (
    <div className="p-2">
      <ThemeSettings />
      <UnitTemperature />
    </div>
  );
};

export default SettingsView;
