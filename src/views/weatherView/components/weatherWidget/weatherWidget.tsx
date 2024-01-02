import axios from "axios";
import { useEffect, useState } from "react";
import SunnIcon3D from "../../../../assets/icons/3D/sunnIcon3D";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import style from "./weatherWidget.module.css";
import {
  onTurnToCelsius,
  onTurnToFahrenheit,
} from "../../../../redux/features/tempUnitSlice";

const WeatherWidget = () => {
  const { currentCity } = useAppSelector((state) => state.citySlice);
  const { unitMetric } = useAppSelector((state) => state.tempUnitSlice);
  const dispatch = useAppDispatch();

  const [temperatureValue, setTemperatureValue] = useState(0);
  const [temperatureUnit, setTemperatureUnit] = useState("");

  useEffect(() => {
    const func = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/currentconditions/v1/${
          currentCity.key
        }?apikey=${import.meta.env.VITE_APIKEY}`
      );
      setTemperatureValue(
        unitMetric
          ? data[0].Temperature.Metric.Value
          : data[0].Temperature.Imperial.Value
      );
      setTemperatureUnit(
        unitMetric
          ? data[0].Temperature.Metric.Unit
          : data[0].Temperature.Imperial.Unit
      );
    };
    func();
  }, [currentCity, unitMetric]);

  return (
    <div
      className={`d-flex justify-content-between ${style.weatherWidgetWrapper}`}
    >
      <div>
        <div className="d-flex align-items-center">
          <h2 className={style.cityHeader}>{currentCity.city}</h2>
          <div className="ms-2 switch">
            <button
              onClick={() => dispatch(onTurnToCelsius())}
              className={`btn btn-dark ${style.btnCelsius}`}
            >
              C
            </button>
            <span className="px-1">/</span>
            <button
              onClick={() => dispatch(onTurnToFahrenheit())}
              className={`btn btn-dark ${style.btnFahrenheit}`}
            >
              F
            </button>
          </div>
        </div>

        <p className={style.countrySubHeader}>{currentCity?.country}</p>
        <h4 className={style.tempDesign}>
          {temperatureValue}°{temperatureUnit}
        </h4>
      </div>
      <div className="d-none d-md-block">
        <SunnIcon3D width={200} height={200} />
      </div>
    </div>
  );
};

export default WeatherWidget;
