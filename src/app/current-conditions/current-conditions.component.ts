import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from "../weather.service";

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.css']
})
export class CurrentConditionsComponent {

  constructor(private router: Router, private weatherService: WeatherService) {
  }

  getCurrentConditions() {
    return this.weatherService.getCurrentConditions$();
  }

  showForecast(zipcode: string) {
    this.router.navigate(['/forecast', zipcode])
  }
}
