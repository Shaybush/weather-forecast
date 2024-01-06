import { useAppSelector } from "../../../../redux/hooks";
import FavoritesNotFound from "../../../../shared/components/favoritesNotFound";
import FavoriteItem from "../favoriteItem";

const FavoritesList = () => {
  const favoritesArray = useAppSelector(
    (state) => state.favoriteSlice.favorites
  );

  return (
    <div className="p-2">
      <h2 className="mb-4">Favorite List:</h2>
      <div className="row">
        {favoritesArray.length ? (
          favoritesArray.map((favorite) => (
            <div key={favorite.key} className="col-lg-3 col-md-4 col-6 p-2">
              <FavoriteItem favorite={favorite} />
            </div>
          ))
        ) : (
          <FavoritesNotFound
            styleClass="text-center text-mute"
            width={"70%"}
            height="300"
          />
        )}
      </div>
    </div>
  );
};

export default FavoritesList;
