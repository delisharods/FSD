import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { WeatherComponent } from './weather/weather.component';
import { AboutComponent } from './about/about.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent, title: 'Home | Weather Dashboard' },
  { path: 'weather', component: WeatherComponent, title: 'Weather | Weather Dashboard' },
  { path: 'about', component: AboutComponent, title: 'About | Weather Dashboard' },
  { path: '**', redirectTo: 'home' },
];
