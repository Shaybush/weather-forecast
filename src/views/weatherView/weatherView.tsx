import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FullForecast from "./components/fullForecast";
import Search from "./components/search";
import WeatherWidget from "./components/weatherWidget";
import React, { useEffect } from "react";
import { onChangeCurrentCity } from "../../redux/features/citySlice";
import { IGeoLocationModel } from "./models/weatherView.model";
import LoadingLine from "../../shared/components/loadingLine";

const WeatherView = () => {
  const dispatch = useAppDispatch();
  const { currentCity } = useAppSelector((state) => state.citySlice);

  // on init get tel aviv
  useEffect(() => {
    if (Object.keys(currentCity).length === 0) getLanLong();
  }, []);

  const getLanLong = () => {
    const options = {
      enableHighAccuracy: true,
      maximumAge: 0,
    };
    if (navigator.geolocation)
      navigator.geolocation.getCurrentPosition(success, error, options);
  };

  const success = async (position: IGeoLocationModel) => {
    const { data } = await axios.get(
      `${
        import.meta.env.VITE_URL
      }/locations/v1/cities/geoposition/search?apikey=${
        import.meta.env.VITE_APIKEY
      }&q=${position.coords.latitude},${position.coords.longitude}`
    );

    // update current city to
    dispatch(
      onChangeCurrentCity({
        currentCity: {
          city: data.LocalizedName,
          country: data.Country.LocalizedName,
          key: data.Key,
        },
      })
    );
  };

  function error() {
    console.warn("Couldn't find location");
  }

  return (
    <React.Fragment>
      <Search />
      {Object.keys(currentCity).length !== 0 ? (
        <React.Fragment>
          <WeatherWidget />
          <FullForecast />
        </React.Fragment>
      ) : (
        <LoadingLine />
      )}
    </React.Fragment>
  );
};

export default WeatherView;
