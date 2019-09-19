import { initialFavoritesState, favoritesState } from './favorites.state';
import { temepratureUnitState, initialTemepratureUnitState } from './temeprature-unit.state';

export interface appState {
    favorites: favoritesState,
    temperatureUnit: temepratureUnitState
}

export const initialAppState: appState = {
    favorites: initialFavoritesState,
    temperatureUnit: initialTemepratureUnitState
}