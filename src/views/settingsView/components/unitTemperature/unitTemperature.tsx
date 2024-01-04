import {
  onTurnToCelsius,
  onTurnToFahrenheit,
} from "../../../../redux/features/tempUnitSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import styles from "./unitTemperature.module.css";

const UnitTemperature = () => {
  const dispatch = useAppDispatch();
  const { unitMetric } = useAppSelector((state) => state.tempUnitSlice);

  const toggleUnit = (): void => {
    console.log(unitMetric);
    unitMetric ? dispatch(onTurnToFahrenheit()) : dispatch(onTurnToCelsius());
  };

  return (
    <div>
      <h3 className="text-mute">Temperature Unit</h3>
      <hr className="text-mute" />
      <p className="text-mute">
        Select your preferred unit for temperature display. You can choose
        between Fahrenheit (°F) and Celsius (°C).
      </p>

      <div className="text-mute mb-3">
        This setting will apply to all temperature readings in the app.
      </div>

      <div className={styles.unitSwitch}>
        <span>{unitMetric ? "Celsius (°C)" : "Fahrenheit (°F)"}</span>
        <button className={styles.buttonSwitch} onClick={() => toggleUnit()}>
          Switch to {unitMetric ? "Fahrenheit" : "Celsius"}
        </button>
      </div>
    </div>
  );
};

export default UnitTemperature;
