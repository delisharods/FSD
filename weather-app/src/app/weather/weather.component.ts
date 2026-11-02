import { Component, OnInit, inject } from '@angular/core';
import { DatePipe, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CITY_NAMES, Weather, WeatherService } from '../weather.service';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [FormsModule, DatePipe, DecimalPipe],
  templateUrl: './weather.component.html',
})
export class WeatherComponent implements OnInit {
  private service = inject(WeatherService);
  private route = inject(ActivatedRoute);

  city = '';                       // bound to the input with [(ngModel)]
  unit: 'C' | 'F' = 'C';           // bound to the radio buttons
  weather: Weather | null = null;
  error = '';
  updatedAt = new Date();
  cities = CITY_NAMES;

  ngOnInit() {
    // Lets the Home page open this route as /weather?city=Mumbai
    this.route.queryParamMap.subscribe((params) => {
      const c = params.get('city');
      if (c) {
        this.city = c;
        this.search();
      }
    });
  }

  search() {
    const result = this.service.getWeather(this.city);
    if (result) {
      this.weather = result;
      this.error = '';
      this.updatedAt = new Date();
    } else {
      this.weather = null;
      this.error = `No sample data for "${this.city.trim()}". Try one of the suggested cities.`;
    }
  }

  /** Converts a °C value for display based on the chosen unit. */
  show(celsius: number): number {
    return this.unit === 'C' ? celsius : (celsius * 9) / 5 + 32;
  }
}
