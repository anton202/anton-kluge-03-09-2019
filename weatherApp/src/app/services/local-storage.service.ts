import { Injectable } from "@angular/core";
import { Weather } from "../models/weather.obj";
import { WeatherCardComponent } from "../weather-card/weather-card.component";

@Injectable({
  providedIn: "root"
})
export class LocalStorage {
  private FAVORITES: string = "favorites";

  constructor() {}

  saveFavoriteForecast(forecast: Weather): void {
    if (localStorage.getItem(this.FAVORITES) === null) {
      localStorage.setItem(this.FAVORITES, JSON.stringify([forecast]));
    } else {
      const favorites = JSON.parse(localStorage.getItem(this.FAVORITES));
      favorites.push(forecast);
      localStorage.setItem(this.FAVORITES, JSON.stringify(favorites));
    }
  }

  removeFavoriteForecast(forecastToDelete: string) {
    const favorites = JSON.parse(localStorage.getItem(this.FAVORITES));
    const filteredFavorites = favorites.filter((forecast: Weather) => {
      return forecast.locationName !== forecastToDelete;
    });
    if (filteredFavorites.length >= 1) {
      localStorage.setItem(this.FAVORITES, JSON.stringify(filteredFavorites));
    } else {
      localStorage.removeItem(this.FAVORITES);
    }
  }

  getFavoriteForecasts(){
      return JSON.parse(localStorage.getItem(this.FAVORITES));
  }
}
