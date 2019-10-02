import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ApiService } from '../api/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { fromEvent } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';

import * as FavoritesAction from '../store/actions/favorites.action';
import { MatDialog } from '@angular/material/dialog';
import { ErrorMessageComponent } from '../error-message/error-message.component';
import { Weather } from '../models/weather.obj';
import { appState } from '../store/state/app.state';
import { WeatherService } from './weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, AfterViewInit {
  private telAvivLocationKey = '215854';
  searchForm: FormGroup;
  locationNameSuggestion: Array<{ LocalizedName, Key }>;
  locationNameDoseNotExist: boolean;
  fetchingForecast: boolean = false;
  forecast: any;
  isFavorite: boolean;
  weeklyWeatherStatus: string;
  weather: Weather;
  temperatureUnit: string;
  @ViewChild('search', { static: false }) searchInput: ElementRef;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private store: Store<appState>,
    private dialog: MatDialog,
    private weatherService: WeatherService
  ) { }

  ngOnInit() {
    this.searchFormItialization();
    this.defaultForecast();

    this.store.select('temperatureUnit')
      .subscribe(unit => {
        this.temperatureUnit = unit.mesureUnit
        if(this.forecast){
        this.forecast = this.weatherService.changeTemperature(this.forecast,this.temperatureUnit);
        }
      })
  }

  ngAfterViewInit() {
    fromEvent(this.searchInput.nativeElement, 'keypress')
      .pipe(map((el: any) => el.target.value), debounceTime(1000))
      .subscribe(locationName => this.getLocationName(locationName))
  }

  private searchFormItialization(): void {
    this.searchForm = new FormGroup({
      locationName: new FormControl(null)
    })
  }

   addToFavorites(): void {
    if (this.isFavorite) {
      this.store.dispatch(new FavoritesAction.RemoveFavorite(this.forecast[0].locationName));
      this.isFavorite = false;
    } else {
      this.isFavorite = true;
      this.store.dispatch(new FavoritesAction.AddToFavorites(this.forecast[0]))
    }
  }

  private getLocationName(locationName): void {
    this.apiService.locationNameSuggestion(locationName)
      .subscribe(locationNames => {
        this.locationNameSuggestion = locationNames;
      },
        () => this.handleError('something went wrong while searchong for location name, please try again or refresh the page')
      )
  }

   onSearchSumbit(): void {
    const locationName = this.searchForm.get('locationName').value;
    const locationKey = this.apiService.getLocationKey(this.locationNameSuggestion, locationName).Key;
    if (!locationKey) {
      this.locationNameDoseNotExist = true;
      return
    }
    this.getWeather(locationKey, locationName);
  }

   getWeather(locationKey?: string, locationName?: string): void {
    this.fetchingForecast = true;
    this.locationNameDoseNotExist = false;
    this.apiService.getWeatherForecast(locationKey)
      .subscribe(forecast => {
      
        this.fetchingForecast = false;
        this.isFavorite = this.weatherService.checkIfFavorite(locationName);
        this.setDataBinding(forecast, locationName, locationKey);
      },
        () => this.handleError('something went wrong while fetchong the forecast, please try again')
      )
  }

  private defaultForecast() {
    this.fetchingForecast = true;
    const locationKey = this.route.snapshot.paramMap.get('locationKey');
    const locationName = this.route.snapshot.paramMap.get('locationName');
    if (locationKey) {
      return this.getWeather(locationKey, locationName);
    }
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.getForecastByGeoLocation.bind(this), this.getWeather.bind(this, this.telAvivLocationKey, 'Tel-Aviv'))
    }
  }

  private getForecastByGeoLocation(position: { coords: { latitude: number, longitude: number } }): void {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    this.apiService.getLocationKeyByGeoLocation(latitude, longitude)
      .subscribe((locationInfo: { LocalizedName, Key }) => {
        const locationName = locationInfo.LocalizedName;
        const locationKey = locationInfo.Key;
       
        this.getWeather(locationKey, locationName)
      },
        () => this.handleError('could not get weather forecast for your geo location.')
      )
  }   

  private setDataBinding(forecast: any, locationName: string, locationKey?: string): void {
    this.weeklyWeatherStatus = forecast.Headline.Text;
    this.forecast = this.weatherService.setWeather(forecast.DailyForecasts, this.temperatureUnit,locationName,locationKey);
  }

  private handleError(errorMessage: string): void {
    this.dialog.open(ErrorMessageComponent, {
      data: { errorMessage: errorMessage }
    })
  }

}


