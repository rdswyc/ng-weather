import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForecastsListComponent } from './forecasts-list/forecasts-list.component';
import { MainPageComponent } from './main-page/main-page.component';

const appRoutes: Routes = [
  {
    path: '', component: MainPageComponent
  },
  {
    path: 'forecast/:zipCountry', component: ForecastsListComponent
  }
];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes, { relativeLinkResolution: 'legacy' });
