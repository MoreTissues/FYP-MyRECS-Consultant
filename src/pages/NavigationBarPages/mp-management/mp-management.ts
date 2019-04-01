import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

@IonicPage()
@Component({
	selector: 'page-mp-management',
	templateUrl: 'mp-management.html'
})
export class MpManagementPage {
	public items: Array<any> = [];

	constructor (public navCtrl: NavController, public navParams: NavParams, public http: HttpClient) {}

	ionViewDidLoad () {
		this.loadCases();
	}
	loadCases (): void {
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/ManagementCRUD/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);
	}
}
