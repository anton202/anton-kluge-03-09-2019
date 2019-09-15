import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class WeatherCardService {
    public daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wedensday', 'Thursday', 'Friday', 'Saturday'];
    
    constructor() { }

    public getDayOfWeek(date: string): string {
        const getDate = new Date(date).getDay();
        return this.daysOfWeek[getDate];
    }

    public convertToCelsius(temperature: number): number {
        return Math.floor((temperature - 32) * 5 / 9);
    }

    public setWeatherIcon(iconNumber: number): string {
        if (iconNumber < 10) {
          return `https://developer.accuweather.com/sites/default/files/${'0' + iconNumber}-s.png`
        }
        return `https://developer.accuweather.com/sites/default/files/${iconNumber}-s.png`
      }
    
}
