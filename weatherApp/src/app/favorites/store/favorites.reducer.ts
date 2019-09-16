import * as FavoritesAction from './favorites.action';

const initialState = {
    favorites: []
}

export function favoritesReducer(state = initialState, action) {
    switch (action.type) {
        case FavoritesAction.ADD_TO_FAVORITES:
            return {
                ...state,
                favorites: [...state.favorites, action.payload]
            };

        case FavoritesAction.REMOVE_FAVORITE:
            return {
                ...state,
                favorites: state.favorites.filter((favoriteObj) => {
                   return favoriteObj.locationName !== action.payload
                })
            }
        default:
            return initialState;
    }
}