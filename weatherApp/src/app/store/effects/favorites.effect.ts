import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from "@ngrx/effects";
import * as favoriteActions from "../actions/favorites.action";
import { LocalStorage } from "../../services/local-storage.service";

import { map } from "rxjs/operators";

@Injectable()
export class FavoritesEffects {
  constructor(
    private actions: Actions,
    private localStorageService: LocalStorage
  ) {}

  addFavoriteToLocalStorage = createEffect(
    () =>
      this.actions.pipe(
        ofType(favoriteActions.ADD_TO_FAVORITES),
        map((favorite: favoriteActions.AddToFavorites) => {
          this.localStorageService.saveFavoriteForecast(favorite.payload);
        })
      ),
    { dispatch: false }
  );

  removeFavoriteFromLocalStorage = createEffect(
    () =>
      this.actions.pipe(
        ofType(favoriteActions.REMOVE_FAVORITE),
        map((favorite: favoriteActions.RemoveFavorite) =>
          this.localStorageService.removeFavoriteForecast(favorite.payload)
        )
      ),
    { dispatch: false }
  );

  loadFavoriteForecasts = createEffect(()=>
  this.actions.pipe(
    ofType(favoriteActions.LOAD_FAVORITES),
    map(()=>{
      const favoriteForecasts = this.localStorageService.getFavoriteForecasts();
      return new favoriteActions.FavoritesLoadSuccess(favoriteForecasts);
    })
    )
    )
}
