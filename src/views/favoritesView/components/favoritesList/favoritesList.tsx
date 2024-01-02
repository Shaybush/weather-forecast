import { useAppSelector } from "../../../../redux/hooks";
import FavoriteItem from "../favoriteItem";

const FavoritesList = () => {
  const favoritesArray = useAppSelector(
    (state) => state.favoriteSlice.favorites
  );

  return (
    <div className="p-2">
      <h2 className="mb-4">Favorite List:</h2>
      <div className="row">
        {favoritesArray.map((favorite) => (
          <div key={favorite.key} className="col-lg-3 col-md-4 col-6 p-2">
            <FavoriteItem favorite={favorite} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;
