import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import FullForecast from "./components/fullForecast";
import Search from "./components/search";
import WeatherWidget from "./components/weatherWidget";
import React, { useEffect } from "react";
import { onChangeCurrentCity } from "../../redux/features/citySlice";
import { IGeoLocationModel } from "./models/weatherView.model";
import LoadingLine from "../../shared/components/loadingLine";
import { toast } from "react-toastify";

const WeatherView = () => {
  const dispatch = useAppDispatch();
  const { currentCity } = useAppSelector((state) => state.citySlice);

  // on init get tel aviv
  useEffect(() => {
    const timer = setTimeout(() => {
      if (Object.keys(currentCity).length === 0) getLanLong();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getLanLong = () => {
    if (!navigator.geolocation) {
      toast("browser not supported");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => getPositionByLandmark(position),
        error
      );
    }
  };

  const getPositionByLandmark = async (position: IGeoLocationModel) => {
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

  const error = (): void => {
    toast("Couldn't find your current location");
    getPositionByLandmark({
      coords: {
        latitude: 32.0853,
        longitude: 34.7818,
      },
    });
  };

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
