import { ActionReducerMap } from '@ngrx/store';
import { appState } from '../state/app.state';
import { favoritesReducer } from './favorites.reducer';
import { temperatureUnitReducer } from './temperature-unit.reducer';


export const appReducers: ActionReducerMap<appState> = {
    favorites: favoritesReducer,
    temperatureUnit: temperatureUnitReducer
}