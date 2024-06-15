import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import SunnyCloudyIcon3D from "../../../../assets/icons/3D/sunnyCloudyIcon3D";
import { onChangeCurrentCity } from "../../../../redux/features/citySlice";
import { onDeleteFavorite } from "../../../../redux/features/favoriteSlice";
import { useAppDispatch, useAppSelector } from "../../../../redux/hooks";
import { favoritePropsModel } from "../../../../redux/models/favorite.model";
import Card from "../../../../shared/components/card";
import style from "./favoriteItem.module.css";
import LoadingLine from "../../../../shared/components/loadingLine";
import FillStarIcon from "../../../../assets/icons/fillStarIcon";

interface FavoritesItemProps {
  favorite: favoritePropsModel;
}

const FavoriteItem = ({ favorite }: FavoritesItemProps) => {
  const { unitMetric } = useAppSelector((state) => state.tempUnitSlice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [temperatureValue, setTemperatureValue] = useState(0);
  const [temperatureUnit, setTemperatureUnit] = useState("");

  useEffect(() => {
    const func = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_URL}/currentconditions/v1/${
            favorite.key
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
  }, []);

  const removeCityFromFavorites = (favorite: favoritePropsModel) => {
    if (
      confirm(
        `Are you sure you want to remove ${favorite.cityName} from favorite ?`
      )
    ) {
      dispatch(onDeleteFavorite({ Key: favorite.key }));
    }
  };

  const navToCity = (favorite: favoritePropsModel) => {
    dispatch(
      onChangeCurrentCity({
        currentCity: {
          city: favorite.cityName,
          country: favorite.countryName,
          key: favorite.key,
        },
      })
    );
    navigate("/");
  };

  return (
    <Card styleClass={`position-relative ${style.cursorPointer}`}>
      {temperatureValue ? (
        <React.Fragment>
          {/* star icon */}
          <div
            className={style.starIconStyle}
            onClick={() => removeCityFromFavorites(favorite)}
          >
            <FillStarIcon styleClass="text-star-icon-active" />
          </div>

          {/* city details */}
          <div
            className={style.favoriteCard}
            onClick={() => navToCity(favorite)}
          >
            <h3 className="mt-4">{favorite.cityName}</h3>
            <SunnyCloudyIcon3D width={100} height={100} />
            <h4 className={style.temperatureStyle}>
              {temperatureValue}°{temperatureUnit}
            </h4>
          </div>
        </React.Fragment>
      ) : (
        <LoadingLine />
      )}
    </Card>
  );
};

export default FavoriteItem;
