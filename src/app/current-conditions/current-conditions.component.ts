import { Component } from '@angular/core';
import { LocationService } from 'app/location.service';
import { WeatherService } from "../weather.service";

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

  constructor(
    protected locationService: LocationService,
    protected weatherService: WeatherService
  ) { }

  getRoute(zip: string, country: string) {
    return ['/forecast', `${zip},${country}`];
  }
}
