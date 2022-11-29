import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Forecast } from 'app/forecast';
import { WeatherService } from '../weather.service';

@Component({
  selector: 'app-forecasts-list',
  templateUrl: './forecasts-list.component.html',
  styleUrls: ['./forecasts-list.component.css']
})
export class ForecastsListComponent {

  forecast: Forecast;

  constructor(
    route: ActivatedRoute,
    public weatherService: WeatherService
  ) {
    route.params.subscribe(params => {
      const zipCountry = params['zipCountry'];
      const [zip, country] = zipCountry.split(',');
      weatherService.getForecast(zip, country)
        .subscribe(data => this.forecast = data);
    });
  }
}
