import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import StarIcon from "../../../../assets/icons/starIcon";
import {
  onAddFavorite,
  onDeleteFavorite,
} from "../../../../redux/features/favoriteSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import style from "./weatherWidget.module.css";
import SunnyCloudyIcon3D from "../../../../assets/icons/3D/sunnyCloudyIcon3D";
import FillStarIcon from "../../../../assets/icons/fillStarIcon";

const WeatherWidget = () => {
  const { currentCity } = useAppSelector((state) => state.citySlice);
  const { unitMetric } = useAppSelector((state) => state.tempUnitSlice);
  const { favorites } = useAppSelector((state) => state.favoriteSlice);

  const dispatch = useAppDispatch();

  const [temperatureValue, setTemperatureValue] = useState(0);
  const [temperatureUnit, setTemperatureUnit] = useState("");

  useEffect(() => {
    const func = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_URL}/currentconditions/v1/${currentCity.key
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
      } catch (err) {
        toast(String(err));
      }
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
    <div className={`d-flex justify-content-between ${style.weatherWidgetWrapper}`}>
      <div>
        {/* star icon */}
        <span onClick={(e) => toggleFavorite(e)}>
          {favorites.some((favorite) => favorite.key === currentCity.key) ? 
          <FillStarIcon width={25} height={25} styleClass="cursor-pointer text-star-icon-active" /> :
          <StarIcon width={25} height={25} styleClass="cursor-pointer text-star-icon" />}
        </span>
        <h2 className={style.cityHeader}>{currentCity.city}</h2>
        <p className={style.countrySubHeader}>{currentCity?.country}</p>
        <h4 className={style.tempDesign}>
          {temperatureValue}°{temperatureUnit}
        </h4>
      </div>
      <div className="d-none d-md-block">
        <SunnyCloudyIcon3D width={200} height={200} />
      </div>
    </div>
  );
};

export default WeatherWidget;
