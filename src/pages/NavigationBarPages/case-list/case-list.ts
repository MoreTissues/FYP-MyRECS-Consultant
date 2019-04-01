import { MpCreateManagementPage } from './../../MP-Create-Update-Cases/mp-create-management/mp-create-management';
import { MpClinicalPage } from './../../MP-Create-Update-Cases/mp-clinical/mp-clinical';
import { MpSpeciesIdPage } from './../../MP-Create-Update-Cases/mp-species-id/mp-species-id';
import { MpHistoryPage } from './../../MP-Create-Update-Cases/mp-history/mp-history';
import { PatientDetailsPage } from './../../MP-Create-Update-Cases/mp-patient-details/patient-details';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/take';
import { Component } from '@angular/core';
import { MpEventPage } from '../../MP-Create-Update-Cases/mp-event/mp-event';
import { NewCaseListPage } from '../../MP-Create-Update-Cases/new-case-list/new-case-list';

@IonicPage()
@Component({
	selector: 'page-case-list',
	templateUrl: 'case-list.html'
})
export class CaseListPage {
	public items: Array<any> = [];
	ButtonPatient: boolean = false;
	ButtonEvent: boolean = false;
	ButtonHistory: boolean = false;
	ButtonSpecies: boolean = false;
	ButtonClinical: boolean = false;
	disableButtonDefault: boolean = true;
	profileData: Observable<any>;

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		public http: HttpClient,
		public actionSheetCtrl: ActionSheetController,
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
		this.navCtrl.push(NewCaseListPage);
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
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/PatientCRUD/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);

		this.ButtonPatient = true;
		this.ButtonEvent = false;
		this.ButtonHistory = false;
		this.ButtonSpecies = false;
		this.ButtonClinical = false;
	}

	loadEventDetails (): void {
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/EventCRUD/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);

		this.ButtonEvent = true;
		this.ButtonPatient = false;
		this.ButtonHistory = false;
		this.ButtonSpecies = false;
		this.ButtonClinical = false;
	}

	loadHistoryDetails (): void {
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/HistoryCRUD/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);

		this.ButtonHistory = true;
		this.ButtonEvent = false;
		this.ButtonPatient = false;
		this.ButtonSpecies = false;
		this.ButtonClinical = false;
	}

	loadSpeciesDetails (): void {
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/SpeciesCRUD/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);

		this.ButtonSpecies = true;
		this.ButtonEvent = false;
		this.ButtonPatient = false;
		this.ButtonHistory = false;
		this.ButtonClinical = false;
	}

	loadClinicalDetails (): void {
		this.http.get('http://lrgs.ftsm.ukm.my/users/a161032/FYP/ClinicalCRUD/retrieve_data.php').subscribe(
			(data: any) => {
				console.dir(data);
				this.items = data;
			},
			(error: any) => {
				console.dir(error);
			}
		);

		this.ButtonClinical = true;
		this.ButtonEvent = false;
		this.ButtonPatient = false;
		this.ButtonHistory = false;
		this.ButtonSpecies = false;
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

	addManagement (param: any): void {
		this.navCtrl.push(MpCreateManagementPage, param);
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

	presentActionSheet () {
		const actionSheet = this.actionSheetCtrl.create({
			title: 'Select which to edit',
			buttons: [
				{
					text: 'Patient',
					handler: () => {
						this.loadPatientDetails();
						//console.log('Move clicked');
					}
				},
				{
					text: 'Event',
					handler: () => {
						const navTransition = actionSheet.dismiss();
						navTransition.then(() => {
							// wait until action sheet dismisses
							// https://ionicframework.com/docs/api/components/action-sheet/ActionSheetController/#advanced
							this.loadEventDetails();
							//console.log('Rename clicked');
						});
						return false;
					}
				},
				{
					text: 'History',
					handler: () => {
						const navTransition = actionSheet.dismiss();
						navTransition.then(() => {
							// wait until action sheet dismisses
							// https://ionicframework.com/docs/api/components/action-sheet/ActionSheetController/#advanced
							this.loadHistoryDetails();
							console.log('Rename clicked');
						});
						return false;
					}
				},
				{
					text: 'Species ID',
					handler: () => {
						const navTransition = actionSheet.dismiss();
						navTransition.then(() => {
							// wait until action sheet dismisses
							// https://ionicframework.com/docs/api/components/action-sheet/ActionSheetController/#advanced
							this.loadSpeciesDetails();
							console.log('Rename clicked');
						});
						return false;
					}
				},
				{
					text: 'Clinical',
					handler: () => {
						const navTransition = actionSheet.dismiss();
						navTransition.then(() => {
							// wait until action sheet dismisses
							// https://ionicframework.com/docs/api/components/action-sheet/ActionSheetController/#advanced
							this.loadClinicalDetails();
							console.log('Rename clicked');
						});
						return false;
					}
				},
				{
					text: 'Cancel',
					role: 'cancel',
					handler: () => {
						this.loadDefault;
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
	}
}
