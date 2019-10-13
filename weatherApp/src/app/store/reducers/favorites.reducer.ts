import * as FavoritesAction from "../actions/favorites.action";
import { initialFavoritesState } from "../state/favorites.state";

export function favoritesReducer(state = initialFavoritesState, action) {
  switch (action.type) {
    case FavoritesAction.ADD_TO_FAVORITES:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };

    case FavoritesAction.REMOVE_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(favoriteObj => {
          return favoriteObj.locationName !== action.payload;
        })
      };

    case FavoritesAction.FAVORITES_LOAD_SUCCESS:
      if (action.payload === null) {
        return { ...state };
      } else {
        return {
          ...state,
          favorites: [...action.payload]
        };
      }

    default:
      return state;
  }
}
