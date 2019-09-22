import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

import { WeatherCardService } from './weather-card.service';
import { Weather, DailyWeather } from '../models/weather.obj';
import { Store } from '@ngrx/store';
import { appState } from '../store/state/app.state';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.css']
})
export class WeatherCardComponent implements OnInit {
  @Input() dailyForecast: { Date, Temperature, Day };
  @Input() favoriteLocationForecast: Weather;
  weather: DailyWeather;
  temperatureUnit: string;

  constructor(private weatherCardService: WeatherCardService, private router: Router, private store: Store<appState>) { }

  ngOnInit() {
    this.store.select('temperatureUnit')
      .subscribe(unit => {
        this.temperatureUnit = unit.mesureUnit
        this.dailyForecast ? this.setDailyForecast() : this.setFavoriteForecast();
      })
  }

  private setDailyForecast(): void {
    let temperature;
    if (this.temperatureUnit === 'c') {
      temperature = this.weatherCardService.convertToCelsius(this.dailyForecast.Temperature.Maximum.Value);
    } else {
      temperature = this.dailyForecast.Temperature.Maximum.Value;
    }
    const dayOfWeek = this.weatherCardService.getDayOfWeek(this.dailyForecast.Date)
    const weatherIcon = this.weatherCardService.setWeatherIcon(this.dailyForecast.Day.Icon)

    this.weather = new DailyWeather(temperature, weatherIcon, dayOfWeek)
  }

  private setFavoriteForecast(): void {
    if (this.temperatureUnit !== this.favoriteLocationForecast.mesureUnit) {
      this.favoriteLocationForecast.temperature = this.weatherCardService.convertTemeprature(this.favoriteLocationForecast.temperature, this.temperatureUnit)
    } else {
      this.favoriteLocationForecast.temperature = this.favoriteLocationForecast.temperature;
    }
  }

  showFavoriteWeather(): void {
    if (this.favoriteLocationForecast) {
      this.router.navigate(['/weather', { locationKey: this.favoriteLocationForecast.locationKey, locationName: this.favoriteLocationForecast.locationName }])
    }
  }

}
