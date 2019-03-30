import { MpClinicalPage } from './../../MP-Create-Update-Cases/mp-clinical/mp-clinical';
import { MpSpeciesIdPage } from './../../MP-Create-Update-Cases/mp-species-id/mp-species-id';
import { MpHistoryPage } from './../../MP-Create-Update-Cases/mp-history/mp-history';
import { PatientDetailsPage } from './../../MP-Create-Update-Cases/mp-patient-details/patient-details';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import { Component } from '@angular/core';
import { MpEventPage } from '../../MP-Create-Update-Cases/mp-event/mp-event';

@IonicPage()
@Component({
	selector: 'page-case-list',
	templateUrl: 'case-list.html'
})
export class CaseListPage {
	public items: Array<any> = [];
	disableButtonPatient: boolean = true;
	disableButtonEvent: boolean = true;
	disableButtonHistory: boolean = true;
	disableButtonSpecies: boolean = true;
	disableButtonClinical: boolean = true;
	disableButtonDefault: boolean = true;
	profileData: Observable<any>;

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		public http: HttpClient,
		private afAuth: AngularFireAuth,
		private afDatabase: AngularFireDatabase,
		private toast: ToastController
	) {}

	ionViewDidLoad () {
		this.loadCases();
		console.log(this.items);
		this.afAuth.authState.take(1).subscribe((data) => {
			if (data && data.email && data.uid) {
				this.toast
					.create({
						message: `Welcome ${data.email} `,
						duration: 2000
					})
					.present();

				this.profileData = this.afDatabase.object(`profile/${data.uid}`).valueChanges();
			} else {
				this.toast
					.create({
						message: `Who are you? `,
						duration: 3000
					})
					.present();
			}
		});
	}

	openAddCaseListPage () {
		//this.navCtrl.push(NewCaseListPage);
	}

	loadCases (): void {
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/Cases/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);
	}

	loadPatientDetails (): void {
		this.disableButtonPatient = false;
		this.disableButtonEvent = true;
		this.disableButtonHistory = true;
		this.disableButtonSpecies = true;
		this.disableButtonClinical = true;
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/PatientCRUD/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);
	}

	loadEventDetails (): void {
		this.disableButtonEvent = false;
		this.disableButtonPatient = true;
		this.disableButtonHistory = true;
		this.disableButtonSpecies = true;
		this.disableButtonClinical = true;
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/EventCRUD/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);
	}

	loadHistoryDetails (): void {
		this.disableButtonEvent = true;
		this.disableButtonPatient = true;
		this.disableButtonHistory = false;
		this.disableButtonSpecies = true;
		this.disableButtonClinical = true;
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/HistoryCRUD/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);
	}

	loadSpeciesDetails (): void {
		this.disableButtonEvent = true;
		this.disableButtonPatient = true;
		this.disableButtonHistory = true;
		this.disableButtonSpecies = false;
		this.disableButtonClinical = true;
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/SpeciesCRUD/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);
	}

	loadClinicalDetails (): void {
		this.disableButtonEvent = true;
		this.disableButtonPatient = true;
		this.disableButtonHistory = true;
		this.disableButtonSpecies = true;
		this.disableButtonClinical = false;
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/ClinicalCRUD/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);
	}

	loadDefault (): void {
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/Cases/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);
		this.disableButtonPatient = true;
		this.disableButtonEvent = true;
		this.disableButtonHistory = true;
		this.disableButtonSpecies = true;
		this.disableButtonClinical = true;
	}

	viewEntry (param: any): void {
		this.navCtrl.push(PatientDetailsPage, param);
	}

	editPatient (param: any): void {
		this.navCtrl.push(PatientDetailsPage, param);
	}

	editEvent (param: any): void {
		this.navCtrl.push(MpEventPage, param);
	}

	editHistory (param: any): void {
		this.navCtrl.push(MpHistoryPage, param);
	}

	editSpecies (param: any): void {
		this.navCtrl.push(MpSpeciesIdPage, param);
	}

	editClinical (param: any): void {
		this.navCtrl.push(MpClinicalPage, param);
	}

	// send Notification Action Buttons and Deep Link
	sendNotificationWithActionButtonsAndDeepLink () {
		window['plugins'].OneSignal.getIds(function (ids) {
			var notificationObj = {
				contents: { en: 'Hi! New Case is Here, please proceed to the App to Review it' },
				include_player_ids: [
					ids.userId
				],
				data: { data_key: 'data_value', openURL: 'https://imgur.com/' },

				buttons: [
					{ id: 'id1', text: 'Open it', icon: 'ic_menu_share' },
					{ id: 'id2', text: 'Mark as read', icon: 'ic_menu_send' }
				]
			};

			window['plugins'].OneSignal.postNotification(
				notificationObj,
				function (successResponse) {
					console.log('Notification Post Success:', successResponse);
				},
				function (failedResponse) {
					console.log('Notification Post Failed: ', failedResponse);
					alert('Notification Post Failed:\n' + JSON.stringify(failedResponse));
				}
			);
		});
	}

	sendNotificationwithImage () {
		window['plugins'].OneSignal.getIds(function (ids) {
			var notificationObj = {
				contents: { en: 'message with image' },
				include_player_ids: [
					ids.userId
				],
				big_picture: 'https://cdn.pixabay.com/photo/2017/09/16/16/09/sea-2755908_960_720.jpg',

				ios_attachments: { id1: 'https://cdn.pixabay.com/photo/2017/09/16/16/09/sea-2755908_960_720.jpg' }
			};

			window['plugins'].OneSignal.postNotification(
				notificationObj,
				function (successResponse) {
					alert('Push opened: ');
				},
				function (failedResponse) {
					console.log('Notification Post Failed: ', failedResponse);
					alert('Notification Post Failed:\n' + JSON.stringify(failedResponse));
				}
			);
		});
	}
}
