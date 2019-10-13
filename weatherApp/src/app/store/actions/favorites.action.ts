import { Action } from '@ngrx/store'
import { Weather } from '../../models/weather.obj';

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';
export const LOAD_FAVORITES = 'LOAD_FAVORITES';
export const FAVORITES_LOAD_SUCCESS = 'FAVORITES_LOAD_SUCCESS';

export class AddToFavorites implements Action {
    readonly type = ADD_TO_FAVORITES;
    constructor(public payload: Weather) { }
}

export class RemoveFavorite implements Action{
    readonly type = REMOVE_FAVORITE;
    constructor(public payload: string){}
}

export class LoadFavorites {
    readonly type = LOAD_FAVORITES;
    constructor(){}
}

export class FavoritesLoadSuccess {
    readonly type = FAVORITES_LOAD_SUCCESS;
    constructor(public payload:Weather[]) {}
}