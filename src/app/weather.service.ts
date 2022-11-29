import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, from, interval, Observable } from 'rxjs';
import { bufferCount, concatMap, delay, map, mergeMap, take, tap } from 'rxjs/operators';

import { Forecast } from './forecast';
import { Weather } from './weather';

type Condition = { zip: string, data: Weather };

@Injectable()
export class WeatherService {

  static URL = 'http://api.openweathermap.org/data/2.5';
  static APPID = '5a4b2d457ecbef9eb2a71e480b947604';
  static ICON_URL = 'https://raw.githubusercontent.com/udacity/Sunshine-Version-2/sunshine_master/app/src/main/res/drawable-hdpi/';
  static bufferSize = 3;
  static refreshMs = 30000;

  private currentConditions$ = new BehaviorSubject<Condition[]>([]);

  constructor(private http: HttpClient) {
    // Refresh weather conditions at every {refreshMs} milliseconds
    interval(WeatherService.refreshMs).pipe(
      // Buffer conditions in blocks of {bufferSize} items
      mergeMap(() => from(this.currentConditions$.value).pipe(bufferCount(WeatherService.bufferSize))),
      // Join each block in parallel calls for performance and concurrency limit
      concatMap(conditions => forkJoin(conditions.map(c => this.fetchCurrentCondition(c.zip)))),
      // Finally, bulk add each block of results to the current conditions
    ).subscribe(data => this.bulkAddCurrentConditions(data))
    // No need to unsubscribe since this service is provided in the main AppModule
  }

  addCurrentConditions$(zipcode: string): Observable<Condition> {
    // Append each weather condition in the currentConditions as a new object
    return this.fetchCurrentCondition(zipcode).pipe(
      delay(500),
      tap(data => this.currentConditions$.next([
        ...this.currentConditions$.value.filter(c => c.zip !== zipcode),
        data
      ]))
    );
  }

  bulkAddCurrentConditions(conditions: Condition[]) {
    // Merge weather conditions in the currentConditions, based on their {zip} code
    const currentConditions = this.currentConditions$.value.map(condition => ({
      ...condition,
      ...conditions.find(({ zip }) => zip === condition.zip),
    }));
    this.currentConditions$.next(currentConditions);
  }

  fetchCurrentCondition(zipcode: string): Observable<Condition> {
    // Here we make a request to get the current conditions data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<Weather>(`${WeatherService.URL}/weather?zip=${zipcode},us&units=imperial&APPID=${WeatherService.APPID}`)
      .pipe(map(data => ({ zip: zipcode, data: data })), take(1));
  }

  removeCurrentConditions(zipcode: string): void {
    const currentConditions = this.currentConditions$.value.filter(data => data.zip !== zipcode);
    this.currentConditions$.next(currentConditions);
  }

  getCurrentConditions$(): Observable<Condition[]> {
    return this.currentConditions$.asObservable();
  }

  getForecast(zipcode: string): Observable<Forecast> {
    // Here we make a request to get the forecast data from the API. Note the use of backticks and an expression to insert the zipcode
    return this.http.get<Forecast>(`${WeatherService.URL}/forecast/daily?zip=${zipcode},us&units=imperial&cnt=5&APPID=${WeatherService.APPID}`);
  }

  getWeatherIcon(id: number): string {
    if (id >= 200 && id <= 232)
      return WeatherService.ICON_URL + "art_storm.png";
    else if (id >= 501 && id <= 511)
      return WeatherService.ICON_URL + "art_rain.png";
    else if (id === 500 || (id >= 520 && id <= 531))
      return WeatherService.ICON_URL + "art_light_rain.png";
    else if (id >= 600 && id <= 622)
      return WeatherService.ICON_URL + "art_snow.png";
    else if (id >= 801 && id <= 804)
      return WeatherService.ICON_URL + "art_clouds.png";
    else if (id === 741 || id === 761)
      return WeatherService.ICON_URL + "art_fog.png";
    else
      return WeatherService.ICON_URL + "art_clear.png";
  }
}
