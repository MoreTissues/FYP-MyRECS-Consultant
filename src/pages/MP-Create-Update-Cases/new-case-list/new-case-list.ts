import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MpClinicalPage } from '../mp-clinical/mp-clinical';
import { MpEventPage } from '../mp-event/mp-event';
import { MpHistoryPage } from '../mp-history/mp-history';
import { PatientDetailsPage } from '../mp-patient-details/patient-details';
import { MpSpeciesIdPage } from '../mp-species-id/mp-species-id';
import { CaseListPage } from './../../NavigationBarPages/case-list/case-list';

@IonicPage()
@Component({
	selector: 'page-new-case-list',
	templateUrl: 'new-case-list.html'
})
export class NewCaseListPage {
	form: FormGroup;
	caseID: any;
	newID: any;

	//Flag to hide the form upon successful completion of remote operation
	hideForm: boolean = false;

	//Remote URI for retrieving data from and sending data to
	private baseURI: string = 'http://lrgs.ftsm.ukm.my/users/a161032/FYP/Cases/';

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		public http: HttpClient,
		public fb: FormBuilder,
		public toastCtrl: ToastController,
		public alertCtrl: AlertController
	) {
		this.form = fb.group({
			id: [
				'',
				Validators.required
			]
		});
	}

	selectEntry (item: any): void {
		this.caseID = item.id;
	}

	//Creates notification with a certain message
	sendNotification (message: string): void {
		let notification = this.toastCtrl.create({
			message: message,
			duration: 3000
		});
		notification.present();
	}

	goBack () {
		this.navCtrl.setRoot(CaseListPage);
	}

	//Create, Read, Update and Delete Functions
	createEntry (id: string): void {
		let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = {
				key: 'create',
				id: id
			},
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				// If the request was successful notify the user
				this.hideForm = true;
				this.sendNotification(`Congratulations the case: ${id} was successfully added`);
				this.goBack();
			},
			(error: any) => {
				//Error Occurs
				this.sendNotification('Something went wrong!');
			}
		);
	}

	saveEntry (): void {
		let id: string = this.form.controls['id'].value;

		this.createEntry(id);
	}

	ionViewDidLoad () {
		console.log('ionViewDidLoad NewCaseListPage');
		var random = Math.floor(Math.random() * 1000);
		this.caseID = 'C0' + random;
	}

	myCallbackFunction = (_params) => {
		return new Promise((resolve, reject) => {
			this.newID = _params; // set return value to the newName parameter
			resolve();
		});
	};

	goToPatientDetailsPage () {
		this.navCtrl.push(PatientDetailsPage, {
			id: this.caseID,
			callback: this.myCallbackFunction // send callback function as nav parameter
		});
	}

	goToEventPage () {
		this.navCtrl.push(MpEventPage, {
			id: this.caseID
		});
	}

	goToHistoryPage () {
		this.navCtrl.push(MpHistoryPage, {
			id: this.caseID
		});
	}

	gotToSpeciesIDPage () {
		this.navCtrl.push(MpSpeciesIdPage, {
			id: this.caseID
		});
	}

	goToClinicalPage () {
		this.navCtrl.push(MpClinicalPage, {
			id: this.caseID
		});
	}
}
