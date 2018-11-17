import { Component, OnInit } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { WeatherApiProvider, } from '../../providers/weather-api/weather-api';
import { WeatherInfo } from '../../app/weather-info';

@Component({
	selector: 'page-weather',
	templateUrl: 'weather.html'
})

export class WeatherPage implements OnInit{
	public cityName: string ;

	public infoWeather: WeatherInfo = new WeatherInfo();
	constructor(public navParams: NavParams,
				private providerParams: WeatherApiProvider 
				){
					this.cityName = navParams.get('name');
				}

	ngOnInit(){
		this.providerParams.getWeatherInfo(this.cityName).subscribe(
			(dataWeather: any) => { 
				this.infoWeather = dataWeather;
				console.log(this.infoWeather);
				console.log(this.infoWeather.temp);
			})
	}
}
