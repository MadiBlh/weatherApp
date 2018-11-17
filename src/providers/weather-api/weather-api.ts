import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WeatherInfo } from '../../app/weather-info';
import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

const API_KEY: string = "ec0d4aea8a7b318849180ffa2cbd50ba";
/*
Generated class for the WeatherApiProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class WeatherApiProvider {

	private apiUrl: string = "https://api.openweathermap.org/data/2.5/weather?q=";
	public apiWeather: WeatherInfo = new WeatherInfo();

	constructor(public http: HttpClient) {}

	public getWeatherInfo(city: string): Observable <WeatherInfo> {

		return this.http.get(this.apiUrl + city + "&appid=" + API_KEY + '&units=metric').pipe(
		  map (
			(data: any) => {

				this.apiWeather.country = data['sys']['country'];

				let description: string = data['weather'][0]['description'];
				this.apiWeather.description = this.translator(description);				
				this.apiWeather.img = "http://openweathermap.org/img/w/" + data['weather'][0]['icon'] + ".png";

				this.apiWeather.temp =  data['main']['temp'];
				this.apiWeather.tempMin = data['main']['temp_min'];
				this.apiWeather.tempMax = data['main']['temp_max'];

				this.apiWeather.humidity = data['main']['humidity'];
				this.apiWeather.wind = data['wind']['speed'];
				this.apiWeather.pressure = data['main']['pressure'];
				
				let date = new Date(data['dt'] * 1000)
				this.apiWeather.date = date.toLocaleDateString();

				console.log(this.apiWeather);

			    return this.apiWeather;
			  
			}
		  )
		)
	   }
//######################### TRADUCTION #######################################################
	public translator(words){
		if(words == 'clear sky'){
			return 'Temps clair';

		}else if(words == 'few clouds'){
			return 'Quelques nuages';

		}else if(words == 'scattered clouds'){
			return 'Nuages ​​dispersés';

		}else if(words == 'broken clouds'){
			return 'Nuages fragmentés ';

		}else if(words == 'shower rain'){
			return 'Brève averse';

		}else if(words == 'rain'){
			return 'Pluvieux';
		}else if(words == 'snow'){
			return 'Neige';
		}else if(words == 'mist'){
			return 'Brouillard';
		}else if(words == 'thunderstorm'){
			return 'Orageux';
		}
	}

}
