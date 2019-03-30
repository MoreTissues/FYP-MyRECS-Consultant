//import { CaseListPage } from './../../NavigationBarPages/case-list/case-list';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//import { NewCaseListPage } from '../new-case-list/new-case-list';

@IonicPage()
@Component({
	selector: 'page-patient-details',
	templateUrl: 'patient-details.html'
})
export class PatientDetailsPage {
	//Initialise all variables according to the type (any=anything)
	form: FormGroup;
	caseID: any = null;
	patientIC: any;
	patientFullName: any;
	patientDOB: any;
	patientAge: any;
	patientCountry: any;
	patientCreatedBy: any;
	patientUpdatedBy: any;
	patientGender: any;
	patientHospitalReported: any;
	patientDateReported: any;
	patientTimeReported: any;
	patientStatus: any;
	updatedBox: boolean = true;

	//Flag to be used for checking whether we are adding/editing an entry
	isEdited: boolean = false;

	//Flag to hide the form upon successful completion of remote operation
	hideForm: boolean = false;

	//Property to help set the page title
	pageTitle: string;

	//Remote URI for retrieving data from and sending data to
	//private baseURI: string = 'http://lrgs.ftsm.ukm.my/users/a161032/FYP/PatientCRUD/';

	//Initialise Parameters with validators(Make sure it is empty)
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
			],
			ic: [
				'',
				Validators.required
			],
			fullname: [
				'',
				Validators.required
			],
			dob: [
				'',
				Validators.required
			],
			age: [
				'',
				Validators.required
			],
			country: [
				'',
				Validators.required
			],
			createdby: [
				'',
				Validators.required
			],
			updatedby: [
				'',
				Validators.required
			],
			gender: [
				'',
				Validators.required
			],
			hospitalReported: [
				'',
				Validators.required
			],
			dateReported: [
				'',
				Validators.required
			],
			timeReported: [
				'',
				Validators.required
			],
			status: [
				'',
				Validators.required
			]
		});
	}

	//When the view Loads
	ionViewDidLoad () {
		//this.resetFields();

		if (this.navParams.get('record')) {
			this.isEdited = true;
			this.updatedBox = false;
			this.selectEntry(this.navParams.get('record'));
			this.pageTitle = 'Amend Entry';
		}
	}

	/* //Reset all the fields
	resetFields (): void {
		this.patientIC = '';
		this.patientFullName = '';
		this.patientDOB = '';
		this.patientAge = '';
		this.patientCountry = '';
		this.patientCreatedBy = '';
		this.patientUpdatedBy = '';
		this.patientGender = '';
		this.patientHospitalReported = '';
		this.patientDateReported = '';
		this.patientTimeReported = '';
		this.patientStatus = '';
	} */

	selectEntry (item: any): void {
		this.caseID = item.caseID;
		this.patientIC = item.patientIC;
		this.patientFullName = item.patientFullName;
		this.patientDOB = item.patientDOB;
		this.patientAge = item.patientAge;
		this.patientCountry = item.patientCountry;
		this.patientCreatedBy = item.patientCreatedBy;
		this.patientUpdatedBy = item.patientUpdatedBy;
		this.patientGender = item.patientGender;
		this.patientHospitalReported = item.patientHospitalReported;
		this.patientDateReported = item.patientDateReported;
		this.patientTimeReported = item.patientTimeReported;
		this.patientStatus = item.patientStatus;
	}

	//Creates notification with a certain message
	sendNotification (message: string): void {
		let notification = this.toastCtrl.create({
			message: message,
			duration: 3000
		});
		notification.present();
	}

	/* //Confirm Dialog for Delete
	showConfirmDialogDelete () {
		const confirm = this.alertCtrl.create({
			title: 'Delete?',
			message: 'Do you agree to delete this item?',
			buttons: [
				{
					text: 'Cancel',
					handler: () => {}
				},
				{
					text: 'OK',
					handler: () => {
						this.deleteEntry();
					}
				}
			]
		});
		confirm.present();
	} */

	/* goBack () {
		this.navCtrl.pop();
	} */

	//Create, Read, Update and Delete Functions
	/* createEntry (
		id: string,
		ic: string,
		fullname: string,
		dob: any,
		age: any,
		country: string,
		createdby: string,
		updatedby: string,
		gender: string,
		hospitalReported: string,
		dateReported: string,
		timeReported: string,
		status: string
	): void {
		let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = {
				key: 'create',
				id: id,
				ic: ic,
				fullname: fullname,
				dob: dob,
				age: age,
				country: country,
				createdby: createdby,
				updatedby: updatedby,
				gender: gender,
				hospitalReported: hospitalReported,
				dateReported: dateReported,
				timeReported: timeReported,
				status: status
			},
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				// If the request was successful notify the user
				this.hideForm = true;
				this.sendNotification(`Congratulations the technology: ${fullname} was successfully added`);
				this.goBack();
			},
			(error: any) => {
				this.sendNotification('Something went wrong!');
			}
		);
	}

	updateEntry (
		id: string,
		ic: string,
		fullname: string,
		dob: any,
		age: any,
		country: string,
		createdby: string,
		updatedby: string,
		gender: string,
		hospitalReported: string,
		dateReported: string,
		timeReported: string,
		status: string
	): void {
		let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = {
				key: 'update',
				id: id,
				ic: ic,
				fullname: fullname,
				dob: dob,
				age: age,
				country: country,
				createdby: createdby,
				updatedby: updatedby,
				gender: gender,
				hospitalReported: hospitalReported,
				dateReported: dateReported,
				timeReported: timeReported,
				status: status
			},
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				this.hideForm = true;
				this.sendNotification(`Congratulations the patient: ${ic} was successfully updated`);
				this.navCtrl.setRoot(CaseListPage);
			},
			(error: any) => {
				this.sendNotification('Something went wrong!');
			}
		);
	} */

	/* deleteEntry (): void {
		let name: string = this.form.controls['fullname'].value,
			headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = { key: 'delete' },
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				this.hideForm = true;
				this.sendNotification(`Congratulations the patient: ${name} was successfully deleted`);
				this.navCtrl.setRoot(NewCaseListPage);
			},
			(error: any) => {
				this.sendNotification('Something went wrong!');
			}
		);
	} */

	/* saveEntry (): void {
		let id: string = this.form.controls['id'].value,
			ic: string = this.form.controls['ic'].value,
			fullname: string = this.form.controls['fullname'].value,
			dob: any = this.form.controls['dob'].value,
			age: any = this.form.controls['age'].value,
			country: string = this.form.controls['country'].value,
			createdby: string = this.form.controls['createdby'].value,
			updatedby: string = this.form.controls['updatedby'].value,
			gender: string = this.form.controls['gender'].value,
			hospitalReported: string = this.form.controls['hospitalReported'].value,
			dateReported: string = this.form.controls['dateReported'].value,
			timeReported: string = this.form.controls['timeReported'].value,
			status: string = this.form.controls['status'].value;

		if (this.isEdited) {
			this.updateEntry(
				id,
				ic,
				fullname,
				dob,
				age,
				country,
				createdby,
				updatedby,
				gender,
				hospitalReported,
				dateReported,
				timeReported,
				status
			);
		} else {
			this.createEntry(
				id,
				ic,
				fullname,
				dob,
				age,
				country,
				createdby,
				updatedby,
				gender,
				hospitalReported,
				dateReported,
				timeReported,
				status
			);
		}
	} */
}
