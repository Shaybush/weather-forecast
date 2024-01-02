import axios from "axios";
import { useEffect, useState } from "react";
import style from "./fullForecast.module.css";
import SunnIcon3D from "../../../../assets/icons/3D/sunnIcon3D";
import { useAppSelector } from "../../../../redux/hooks";
import {
  IAxiosDailyForecastsModel,
  IDailyForecastsModel,
} from "./models/fullForecast.model";

const FullForecast = () => {
  const [foreCast, setForeCast] = useState<IDailyForecastsModel[]>();
  const { currentCity } = useAppSelector((state) => state.citySlice);

  const formatAMPM = (UNIX_timestamp: number) => {
    const date = new Date(UNIX_timestamp);
    console.log(date);

    let hours = date.getHours();
    let minutes: string | number = date.getMinutes();
    let seconds: string | number = date.getSeconds();

    const ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    const strTime = hours + ":" + minutes + ":" + seconds + " " + ampm;

    return strTime;
  };

  const fetch = async () => {
    try {
      const {
        data: { DailyForecasts },
      } = await axios.get<IAxiosDailyForecastsModel>(
        `${import.meta.env.VITE_URL}/forecasts/v1/daily/5day/${
          currentCity.key
        }?apikey=${import.meta.env.VITE_APIKEY}`
      );
      console.log(
        DailyForecasts.map((el) => {
          const res: number = Date.parse(el.Date);
          return formatAMPM(res);
        })
      );
      setForeCast(DailyForecasts);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetch();
  }, [currentCity]);

  return (
    <div className={style.fullForceCastContainer}>
      {foreCast?.map((item, i) => (
        <div key={i} className="d-flex flex-column align-items-center">
          {/* <p className={style.dateStyle}> {item}</p> */}
          <SunnIcon3D width={80} height={80} />
          <p className={style.temperatureStyle}>
            {/* {item.temperatureValue}°{item.temperatureUnit} */}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FullForecast;
