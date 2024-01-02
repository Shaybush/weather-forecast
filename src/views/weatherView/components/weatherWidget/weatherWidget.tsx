import { useEffect, useState } from "react";
import SunnIcon3D from "../../../../assets/icons/3D/sunnIcon3D";
import { useAppSelector } from "../../../../redux/hooks";
import style from "./weatherWidget.module.css";
import axios from "axios";

const WeatherWidget = () => {
  const { currentCity } = useAppSelector((state) => state.citySlice);
  const [temperatureValue, setTemperatureValue] = useState(0);
  const [temperatureUnit, setTemperatureUnit] = useState("");

  useEffect(() => {
    const func = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/currentconditions/v1/${
          currentCity.key
        }?apikey=${import.meta.env.VITE_APIKEY}`
      );
      console.log(data);
      setTemperatureValue(data[0].Temperature.Metric.Value);
      setTemperatureUnit(data[0].Temperature.Metric.Unit);
    };
    func();
  }, [currentCity]);

  return (
    <div
      className={`d-flex justify-content-between ${style.weatherWidgetWrapper}`}
    >
      <div>
        <h2 className={style.cityHeader}>{currentCity.city}</h2>
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
