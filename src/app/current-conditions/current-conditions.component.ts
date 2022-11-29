import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocationService } from 'app/location.service';
import { WeatherService } from "../weather.service";

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

  constructor(
    private router: Router,
    public locationService: LocationService,
    public weatherService: WeatherService
  ) { }

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }
}
