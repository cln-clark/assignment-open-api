import { Controller, Get, Query } from '@nestjs/common';
import { ApiService } from './api.service';

@Controller('weather') // Define the route prefix as /weather
export class ApiController {
  constructor(private readonly apiService: ApiService) {}

  @Get() // Handle GET requests to /weather
  async getWeather(@Query('city') city: string) {
    if (!city) {
      return { message: 'City is required' };
    }
    return this.apiService.getWeatherByCity(city);
  }
}
