import { Injectable } from '@angular/core';

export interface ForecastDay { day: string; high: number; low: number; icon: string; }
export interface Weather {
  city: string; country: string; temp: number; feelsLike: number;
  humidity: number; wind: number; condition: string; icon: string;
  forecast: ForecastDay[];
}

// [city, country, temp °C, feels like, humidity %, wind km/h, condition, icon]
const SAMPLE: [string, string, number, number, number, number, string, string][] = [
  ['Nagpur', 'India', 32, 34, 48, 9, 'Sunny', '☀️'],
  ['Mumbai', 'India', 30, 35, 78, 15, 'Humid', '🌤️'],
  ['Delhi', 'India', 27, 28, 55, 11, 'Hazy', '🌫️'],
  ['Bengaluru', 'India', 24, 24, 65, 13, 'Partly cloudy', '⛅'],
  ['Chennai', 'India', 31, 36, 74, 17, 'Humid', '🌤️'],
  ['Kolkata', 'India', 29, 33, 80, 10, 'Light rain', '🌦️'],
  ['Hyderabad', 'India', 28, 29, 58, 12, 'Clear', '☀️'],
  ['Pune', 'India', 26, 26, 60, 14, 'Cloudy', '☁️'],
  ['London', 'United Kingdom', 12, 10, 78, 20, 'Overcast', '☁️'],
  ['New York', 'United States', 16, 15, 62, 18, 'Windy', '🌬️'],
  ['Tokyo', 'Japan', 19, 19, 66, 8, 'Partly cloudy', '⛅'],
  ['Dubai', 'United Arab Emirates', 38, 42, 40, 16, 'Sunny', '☀️'],
];

export const CITY_NAMES = SAMPLE.map((s) => s[0]);

@Injectable({ providedIn: 'root' })
export class WeatherService {
  /** Returns sample weather for a city (case-insensitive), or null if unknown. */
  getWeather(name: string): Weather | null {
    const row = SAMPLE.find((s) => s[0].toLowerCase() === name.trim().toLowerCase());
    if (!row) return null;
    const [city, country, temp, feelsLike, humidity, wind, condition, icon] = row;

    const icons = [icon, '⛅', '🌦️'];
    const forecast: ForecastDay[] = [1, 2, 3].map((n, i) => {
      const d = new Date();
      d.setDate(d.getDate() + n);
      return {
        day: d.toLocaleDateString('en-US', { weekday: 'short' }),
        high: temp + [1, -1, 2][i],
        low: temp - [6, 7, 5][i],
        icon: icons[i],
      };
    });
    return { city, country, temp, feelsLike, humidity, wind, condition, icon, forecast };
  }
}
