import axios from "axios";
import { useEffect, useState } from "react";
import SunnIcon3D from "../../../../assets/icons/3D/sunnIcon3D";
import StarIcon from "../../../../assets/icons/starIcon";
import {
  onAddFavorite,
  onDeleteFavorite,
} from "../../../../redux/features/favoriteSlice";
import {
  onTurnToCelsius,
  onTurnToFahrenheit,
} from "../../../../redux/features/tempUnitSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import style from "./weatherWidget.module.css";

const WeatherWidget = () => {
  const { currentCity } = useAppSelector((state) => state.citySlice);
  const { unitMetric } = useAppSelector((state) => state.tempUnitSlice);
  const { favorites } = useAppSelector((state) => state.favoriteSlice);

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

  const toggleFavorite = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation();
    favorites.some((favorite) => favorite.key === currentCity.key)
      ? // remove from state
        dispatch(onDeleteFavorite({ Key: currentCity.key || "" }))
      : // add current city to favorite
        dispatch(
          onAddFavorite({
            cityName: currentCity.city || "",
            countryName: currentCity.country || "",
            key: currentCity.key || "",
          })
        );
  };

  return (
    <div
      className={`d-flex justify-content-between ${style.weatherWidgetWrapper}`}
    >
      <div>
        <div onClick={(e) => toggleFavorite(e)}>
          <StarIcon
            width={25}
            height={25}
            styleClass={`
            cursor-pointer
              ${
                favorites.some((favorite) => favorite.key === currentCity.key)
                  ? "text-star-icon-active"
                  : "text-star-icon"
              }
            `}
          />
        </div>
        <div className="d-flex align-items-center">
          <h2 className={style.cityHeader}>{currentCity.city}</h2>
          {/* unit switch */}
          <div className="ms-2 switch">
            <button
              onClick={() => dispatch(onTurnToCelsius())}
              className="btn btn-dark"
            >
              C
            </button>
            <span className="px-1">/</span>
            <button
              onClick={() => dispatch(onTurnToFahrenheit())}
              className="btn btn-dark"
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
