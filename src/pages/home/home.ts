import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherPage } from '../weather/weather';

@Component({
	selector: 'page-home',
	templateUrl: 'home.html'
})
export class HomePage {

	public cityName: string = "Ville";
	constructor(public navCtrl: NavController) {}

	getWeather(){
		this.navCtrl.push(WeatherPage, {
			name: this.cityName
		  });
	}
}
