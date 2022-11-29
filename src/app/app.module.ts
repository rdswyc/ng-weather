import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppComponent } from './app.component';
import { AutoFilterComponent } from './auto-filter/auto-filter.component';
import { CurrentConditionsComponent } from './current-conditions/current-conditions.component';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { MainPageComponent } from './main-page/main-page.component';
import { StateButtonComponent } from './state-button/state-button.component';
import { ZipcodeEntryComponent } from './zipcode-entry/zipcode-entry.component';

import { LocationService } from './location.service';
import { WeatherService } from './weather.service';
import { routing } from './app.routing';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    AutoFilterComponent,
    CurrentConditionsComponent,
    ForecastsListComponent,
    MainPageComponent,
    StateButtonComponent,
    ZipcodeEntryComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    routing,
    ServiceWorkerModule.register('/ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [LocationService, WeatherService],
  bootstrap: [AppComponent]
})
export class AppModule { }
