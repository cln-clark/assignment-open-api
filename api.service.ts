import { Injectable, HttpException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class ApiService {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(private readonly configService: ConfigService) {
    // Get API key and base URL from the environment
    this.apiKey = this.configService.get<string>('OPENWEATHER_API_KEY');
    this.baseUrl = this.configService.get<string>('OPENWEATHER_BASE_URL');
  }

  async getWeatherByCity(city: string): Promise<any> {
    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          q: city,
          appid: this.apiKey,
          units: 'metric', // Returns temperature in Celsius
        },
      });
      return response.data; // Return the weather data
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error fetching weather data',
        error.response?.status || 500,
      );
    }
  }
}
