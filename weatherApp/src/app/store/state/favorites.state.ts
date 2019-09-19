import { Weather } from 'src/app/models/weather.obj';

export interface favoritesState{
    favorites: Array<Weather>
}

export const initialFavoritesState:favoritesState = {
    favorites: []
} 

