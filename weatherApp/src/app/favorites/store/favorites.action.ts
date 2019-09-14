import { Action } from '@ngrx/store'

export const ADD_TO_FAVORITES = 'ADD_TO_FAVORITES';
export const REMOVE_FAVORITE = 'REMOVE_FAVORITE';

export interface favorite {
    id: string ,
    name: string,
    weather: number,
    icon: string,
}

export class AddToFavorites implements Action {
    readonly type = ADD_TO_FAVORITES;
    constructor(public payload: favorite) { }
}

export class RemoveFavorite implements Action{
    readonly type = REMOVE_FAVORITE;
    constructor(public payload: string){}
}