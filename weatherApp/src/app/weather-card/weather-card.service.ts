import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { appState } from '../store/state/app.state';
import { temepratureUnitState } from '../store/state/temeprature-unit.state';
import { temperatureUnitReducer } from '../store/reducers/temperature-unit.reducer';
import { ArrayDataSource } from '@angular/cdk/collections';


@Injectable({
    providedIn: 'root'
})
export class WeatherCardService {
     daysOfWeek:Array<string> = ['Sunday', 'Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday', 'Saturday'];
    
    constructor() {}

     getDayOfWeek(date: string): string {
        const getDate = new Date(date).getDay();
        return this.daysOfWeek[getDate];
    }

     convertToCelsius(temperature: number): number {
            return Math.floor((temperature - 32) * 5 / 9);
    }

     convertToFahrenheit(temperature: number): number{
        return Math.floor((temperature * 9 / 5) + 32);
    }

     convertTemeprature(temeprature: number, unit: string): number{
        if(unit === 'c'){
            return this.convertToCelsius(temeprature);
        }else{
            return temeprature;
        }
    }

     setWeatherIcon(iconNumber: number): string {
        if (iconNumber < 10) {
          return `https://developer.accuweather.com/sites/default/files/${'0' + iconNumber}-s.png`
        }
        return `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`
      }
    
}
