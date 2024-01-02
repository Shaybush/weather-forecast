import React, { useEffect, useState } from "react";
import SunnIcon3D from "../../../../assets/icons/3D/sunnIcon3D";
import StarIcon from "../../../../assets/icons/starIcon";
import { favoritePropsModel } from "../../../../redux/models/favorite.model";
import style from "./favoriteItem.module.css";
import axios from "axios";
import { onDeleteFavorite } from "../../../../redux/features/favoriteSlice";
import { useDispatch } from "react-redux";

interface FavoritesItemProps {
  favorite: favoritePropsModel;
}

const FavoriteItem = ({ favorite }: FavoritesItemProps) => {
  const dispatch = useDispatch();
  const [temperatureValue, setTemperatureValue] = useState(0);
  const [temperatureUnit, setTemperatureUnit] = useState("");

  useEffect(() => {
    const func = async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_URL}/currentconditions/v1/${
          favorite.key
        }?apikey=${import.meta.env.VITE_APIKEY}`
      );
      console.log(data);
      setTemperatureValue(data[0].Temperature.Metric.Value);
      setTemperatureUnit(data[0].Temperature.Metric.Unit);
    };
    func();
  }, []);

  const removeCityFromFavorites = (key: string) => {
    dispatch(onDeleteFavorite({ Key: key }));
  };

  return (
    <div className={style.favoriteWrapper}>
      {temperatureValue ? (
        <React.Fragment>
          <div
            className={style.starIconStyle}
            onClick={() => removeCityFromFavorites(favorite.key)}
          >
            <StarIcon color="#ffdd00" />
          </div>
          <div className={style.favoriteCard}>
            <h3 className="mt-4">{favorite.cityName}</h3>
            <SunnIcon3D width={100} height={100} />
            <h4 className={style.temperatureStyle}>
              {temperatureValue}°{temperatureUnit}
            </h4>
          </div>
        </React.Fragment>
      ) : (
        <div className={style.favoriteLoading}>Loading ...</div>
      )}
    </div>
  );
};

export default FavoriteItem;
