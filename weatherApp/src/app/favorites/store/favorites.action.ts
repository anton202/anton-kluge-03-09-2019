import { Action } from '@ngrx/store'
import { Weather } from '../../weather/weather.model';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export class AddToFavorites implements Action {
    readonly type = ADD_TO_FAVORITES;
    constructor(public payload: Weather) { }
}

export class RemoveFavorite implements Action{
    readonly type = REMOVE_FAVORITE;
    constructor(public payload: string){}
}