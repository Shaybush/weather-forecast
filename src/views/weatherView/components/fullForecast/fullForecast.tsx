import axios from "axios";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import CloudyIcon3D from "../../../../assets/icons/3D/cloudyIcon3D";
import LightningIcon3D from "../../../../assets/icons/3D/lightningIcon3D";
import RainIcon3D from "../../../../assets/icons/3D/rainIcon3D";
import SunnyCloudyIcon3D from "../../../../assets/icons/3D/sunnyCloudyIcon3D";
import { useAppSelector } from "../../../../redux/hooks";
import Card from "../../../../shared/components/card";
import style from "./fullForecast.module.css";
import {
  IAxiosDailyForecastsModel,
  IDailyForecastsModel,
} from "./models/fullForecast.model";

const FullForecast = () => {
  const { currentCity } = useAppSelector((state) => state.citySlice);
  const { unitMetric } = useAppSelector((state) => state.tempUnitSlice);
  const [foreCast, setForeCast] = useState<IDailyForecastsModel[]>();

  const iconsScales = 80;
  // just demo
  const weatherIconsArray = [
    <SunnyCloudyIcon3D width={iconsScales} height={iconsScales} />,
    <CloudyIcon3D width={iconsScales} height={iconsScales} />,
    <SunnyCloudyIcon3D width={iconsScales} height={iconsScales} />,
    <LightningIcon3D width={iconsScales} height={iconsScales} />,
    <RainIcon3D width={iconsScales} height={iconsScales} />,
  ];

  const fetch = async () => {
    try {
      const {
        data: { DailyForecasts },
      } = await axios.get<IAxiosDailyForecastsModel>(
        `${import.meta.env.VITE_URL}/forecasts/v1/daily/5day/${
          currentCity.key
        }?apikey=${import.meta.env.VITE_APIKEY}&metric=${unitMetric}`
      );
      const foreCastTemp: IDailyForecastsModel[] = mapForecasts(DailyForecasts);
      setForeCast(foreCastTemp);
    } catch (err) {
      console.log(err);
    }
  };

  const mapForecasts = (
    dailyForecasts: IDailyForecastsModel[]
  ): IDailyForecastsModel[] => {
    return dailyForecasts.map((el) => {
      const date: number = Date.parse(el.Date);
      return {
        Date: format(date, "MMM, yyyy"),
        Day: el.Day,
        Temperature: el.Temperature,
      };
    });
  };

  useEffect(() => {
    fetch();
  }, [currentCity, unitMetric]);

  return (
    <Card headerContext="5-DAY FORECAST">
      <div className={style.forecastSlider}>
        {foreCast?.map((item, i) => (
          <div key={i} className={`${style.forecastDesign}`}>
            <div className="d-flex flex-column align-items-center">
              <h4 className={style.header}>{item.Date}</h4>
              {weatherIconsArray[Math.floor(item.Day.Icon / 9)]}
              <p className={style.temperatureStyle}>
                <span>
                  {Math.floor(item.Temperature.Minimum.Value)}°
                  {item.Temperature.Minimum.Unit}
                </span>
                <span className="px-1">-</span>
                <span>
                  {Math.floor(item.Temperature.Maximum.Value)}°
                  {item.Temperature.Maximum.Unit}
                </span>
              </p>
            </div>

            {/* border right */}
            {i !== foreCast.length - 1 && <div className={style.border}></div>}
          </div>
        ))}
      </div>
    </Card>
  );
};

export default FullForecast;
