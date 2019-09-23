import { Injectable } from '@angular/core';
import { Weather } from '../models/weather.obj';
import { Store } from '@ngrx/store';
import { appState } from '../store/state/app.state';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  daysOfWeek:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday', 'Saturday'];
  private favorites:Weather[];

  constructor(private store: Store<appState>) {
    this.store.select('favorites')
          .subscribe(favorites =>{
            this.favorites = favorites.favorites;
          })
   }

  setWeather(forecast: any, mesureUnit: string, locationName:string, locationKey: string): Weather[] {
    return forecast.map(el => {
      const getTemperature = el.Temperature.Maximum.Value
      const weatherIcon = this.setWeatherIcon(el.Day.Icon)
      const temperature = mesureUnit === 'f' ?getTemperature: this.convertToCelsius(getTemperature)
      const day = this.getDayOfWeek(el.Date);
      return new Weather(locationName,temperature,weatherIcon,mesureUnit,locationKey,day);
    })
  }

  changeTemperature(forecast: any, mesureUnit: string):Weather[]{
    return forecast.map(el =>{
      if(el.mesureUnit !== mesureUnit){
        el.temperature = this.setCelsiusOrFahrenheit(el.temperature,mesureUnit);
        el.mesureUnit = mesureUnit;
        return el
      }else{
        return el
      }
    })
  }

  setCelsiusOrFahrenheit(temperature: number, mesureUnit: string): number {
    if (mesureUnit === 'c') {
      return this.convertToCelsius(temperature);
    }else{
      return this.convertToFahrenheit(temperature);
    }
  }

  checkIfFavorite(locationName: string) {
    const result = this.favorites.filter(el => locationName === el.locationName);
    return result.length > 0 ? true : false;
  }

  convertToCelsius(temperature: number): number {
    return Math.round((temperature - 32) * 5 / 9);
  }

  convertToFahrenheit(temperature: number): number {
    return Math.round((temperature * 9 / 5) + 32);
  }

  getDayOfWeek(date: string): string {
    const getDate = new Date(date).getDay();
    return this.daysOfWeek[getDate];
}


  setWeatherIcon(iconNumber: number): string {
    if (iconNumber < 10) {
      return `https://developer.accuweather.com/sites/default/files/${'0' + iconNumber}-s.png`
    }
    return `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`
  }
}
