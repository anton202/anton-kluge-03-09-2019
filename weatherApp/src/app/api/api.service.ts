import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiKey: string = '7Is6CpWd2Q1WMUQXR8AY9VJKLJte6xGM';
  private apiUrl: string = 'http://dataservice.accuweather.com/locations/v1';

  constructor(private http: HttpClient) { }

  public locationNameSuggestion(locationName: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cities/autocomplete?apikey=${this.apiKey}&q=${locationName}`)
  }

  public getWeatherForecast(locationKey: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/daily/5day/${locationKey}?apikey=${this.apiKey}`)
  }

  public getLocationKeyByGeoLocation(latitude: number, longitude: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/cities/geoposition/search?apikey=${this.apiKey}&q=${latitude}%2C${longitude}`)
  }

  public getLocationKey(locationArray: Array<{ LocalizedName, Key }>, locationName: string): string {
    for (let i = 0; i < locationArray.length; i++) {
      if (locationArray[i].LocalizedName === locationName) {
        return locationArray[i].Key;
      }
    }
  }


}
