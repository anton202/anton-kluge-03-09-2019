import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import { WeatherCardService } from '../weather-card/weather-card.service';
import * as FavoritesAction from '../favorites/store/favorites.action';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {
  public searchForm: FormGroup;
  public locationNameSuggestion: object[] = [];
  public locationKey: number | boolean;
  public locationNameDoseNotExist: boolean;
  public forecast: any[];
  public fetchingForecast: boolean = false;
  public weeklyWeatherStatus: string;
  private geoLocationWeather: Observable<[]>
  public locationName: string;
  public temperature: number;
  public weatherIcon: string;
  public isFavorite: boolean;
  private favorites: any;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private weatherCardService: WeatherCardService,
    private store: Store<{ favorites: { favorites } }>,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.searchFormItialization();
    this.defaultForecast()
    this.getFavoriteLocations();
  }

  private searchFormItialization(): void {
    this.searchForm = new FormGroup({
      locationName: new FormControl(null)
    })
  }

  public addToFavorites(): void {
    if (this.isFavorite) {
      this.store.dispatch(new FavoritesAction.RemoveFavorite(this.locationName));
      this.isFavorite = false;
    } else {
      this.isFavorite = true;
      this.store.dispatch(new FavoritesAction.AddToFavorites({ id: this.locationKey, name: this.locationName, weather: this.temperature, icon: this.weatherIcon }))
    }
  }

  public getLocationName(): void {
    const locationName = this.searchForm.get('locationName').value;

    this.apiService.locationNameSuggestion(locationName)
      .subscribe(locationNames => {
        this.locationNameSuggestion = locationNames;
      },
        error => this.handleError('something went wrong while searchong for location name, please try again or refresh the page')
      )
  }

  public getWeather(): void {
    const locationName = this.searchForm.get('locationName').value;
    const locationKey = this.apiService.getLocationKey(this.locationNameSuggestion, locationName)
    if (!locationKey) {
      this.locationNameDoseNotExist = true;
      return
    }
    this.fetchingForecast = true;
    this.locationNameDoseNotExist = false;
    this.apiService.getWeatherForecast(locationKey)
      .subscribe(forecast => {
        this.checkIfFavorite(locationName);
        this.locationKey = locationKey;
        this.fetchingForecast = false;
        this.forecast = forecast.DailyForecasts;
        this.weeklyWeatherStatus = forecast.Headline.Text;
        this.locationName = locationName;
        this.temperature = this.setTemperature(forecast);
        this.weatherIcon = this.setWeatherIcon(forecast.DailyForecasts[0].Day.Icon);
      },
        error => this.handleError('something went wrong while fetchong the forecast, please try again')
      )
  }

  private defaultForecast() {
    this.fetchingForecast = true;
    const locationKey = this.route.snapshot.paramMap.get('locationKey');
    if (locationKey) {
      return this.getFavoriteForecast(locationKey);
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.getForecastByGeoLocation.bind(this),this.getTelAvivForecast.bind(this))
    } 
  }

  private getForecastByGeoLocation(position: any): void {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.geoLocationWeather = this.apiService.getLocationKeyByGeoLocation(latitude, longitude)
      .pipe(mergeMap((location: { Key }) => this.apiService.getWeatherForecast(location.Key)));

    this.geoLocationWeather.subscribe((forecast: any) => {
      this.fetchingForecast = false;
      this.forecast = forecast.DailyForecasts
      this.weeklyWeatherStatus = forecast.Headline.Text;
      this.temperature = this.setTemperature(forecast);
      this.weatherIcon = this.setWeatherIcon(forecast.DailyForecasts[0].Day.Icon);
    },
      error => this.handleError('could not get weather forecast for your geo location.')
    )

    this.apiService.getLocationKeyByGeoLocation(latitude, longitude)
      .subscribe((locationInfo: { LocalizedName,Key }) => {
        this.locationName = locationInfo.LocalizedName;
        this.locationKey = locationInfo.Key;
      },
        error => this.handleError('failed getting location name, please try to refresh the page')
      )
  }

  private getTelAvivForecast(): void {
    const telAvivLocationKey = 215854;
    this.apiService.getWeatherForecast(telAvivLocationKey)
      .subscribe(forecast => {
        this.fetchingForecast = false
        this.forecast = forecast.DailyForecasts;
        this.weeklyWeatherStatus = forecast.Headline.Text;
        this.locationName = 'Tel-Aviv'
        this.temperature = this.setTemperature(forecast);
        this.weatherIcon = this.setWeatherIcon(forecast.DailyForecasts[0].Day.Icon)
      },
        error => this.handleError('failed fetching Tel Aviv forecast, try again.')
      )
  }

  private getFavoriteForecast(locationKey: number | string): void {
    this.apiService.getWeatherForecast(locationKey)
      .subscribe(forecast => {
        this.fetchingForecast = false;
        this.isFavorite = true;
        this.forecast = forecast.DailyForecasts;
        this.locationName = this.route.snapshot.paramMap.get('locationName');
        this.temperature = this.setTemperature(forecast)
        this.weatherIcon = this.setWeatherIcon(forecast.DailyForecasts[0].Day.Icon);
        this.weeklyWeatherStatus = forecast.Headline.Text;
      },
        error => this.handleError(`failed fetching forecast for ${this.route.snapshot.paramMap.get('locationName')}`)
      )
  }

  private setTemperature(forecastObj) {
    return this.weatherCardService.convertToCelsius(forecastObj.DailyForecasts[0].Temperature.Maximum.Value);
  }

  private setWeatherIcon(iconNumber) {
    if (iconNumber < 10) {
      return `https://developer.accuweather.com/sites/default/files/${'0' + iconNumber}-s.png`
    }
    return `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`
  }

  private checkIfFavorite(locationName) {
    for (let i = 0; i < this.favorites.length; i++) {
      if (locationName === this.favorites[i].name) {
        return this.isFavorite = true;
      }
      this.isFavorite = false;
    }
  }

  private getFavoriteLocations() {
    this.store.select('favorites')
      .subscribe(favorites => {
        this.favorites = favorites.favorites;
      })
  }

  private handleError(errorMessage): void {
    this.dialog.open(ErrorMessageComponent, {
      data: { errorMessage: errorMessage }
    })
  }

}


