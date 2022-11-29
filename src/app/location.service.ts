import { Injectable } from '@angular/core';
import { WeatherService } from './weather.service';

export const LOCATIONS: string = 'locations';

@Injectable()
export class LocationService {

  locations: string[] = [];

  constructor(private weatherService: WeatherService) {
    let locString = localStorage.getItem(LOCATIONS);
    if (locString)
      this.locations = JSON.parse(locString);
    for (let loc of this.locations) {
      const [zip, country] = loc.split(',');
      this.weatherService.addCurrentConditions$(zip, country).toPromise();
    }
  }

  async addLocation(zipCode: string, countryCode: string) {
    const exists = this.locations.some(loc => loc === `${zipCode},${countryCode}`);

    if (exists) {
      alert('Zipcode and country combination already added!');
    } else {
      await this.weatherService.addCurrentConditions$(zipCode, countryCode).toPromise();
      this.locations.push(`${zipCode},${countryCode}`);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
    }
  }

  removeLocation(zipCode: string, countryCode: string) {
    let index = this.locations.indexOf(`${zipCode},${countryCode}`);
    if (index !== -1) {
      this.locations.splice(index, 1);
      localStorage.setItem(LOCATIONS, JSON.stringify(this.locations));
      this.weatherService.removeCurrentConditions(zipCode, countryCode);
    }
  }
}
