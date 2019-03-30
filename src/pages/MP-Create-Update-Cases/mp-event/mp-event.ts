import { CaseListPage } from './../../NavigationBarPages/case-list/case-list';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'page-mp-event',
	templateUrl: 'mp-event.html'
})
export class MpEventPage {
	caseID: any;
	form: FormGroup;
	eventIncidentLocation: any;
	eventName: any;
	eventDateIncident: any;
	eventTimeIncident: any;
	eventActivity: any;
	eventFeet: boolean;
	eventAnkle: boolean;
	eventLeg: boolean;
	eventHand: boolean;
	eventFinger: boolean;
	eventAbdomen: boolean;
	eventChest: boolean;
	eventPrivatePart: boolean;
	eventOthers: any;

	//Flag to be used for checking whether we are adding/editing an entry
	isEdited: boolean = false;

	//Flag to hide the form upon successful completion of remote operation
	hideForm: boolean = false;

	//Property to help set the page title
	pageTitle: string;

	//Remote URI for retrieving data from and sending data to
	//private baseURI: string = 'http://lrgs.ftsm.ukm.my/users/a161032/FYP/EventCRUD/';

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
			incidentLocation: [
				'',
				Validators.required
			],
			name: [
				'',
				Validators.required
			],
			dateIncident: [
				'',
				Validators.required
			],
			timeIncident: [
				'',
				Validators.required
			],
			activity: [
				'',
				Validators.required
			],
			feet: [
				false
			],
			ankle: [
				false
			],
			leg: [
				false
			],
			hand: [
				false
			],
			finger: [
				false
			],
			abdomen: [
				false
			],
			chest: [
				false
			],
			privatepart: [
				false
			],
			others: [
				'',
				Validators.required
			]
		});

		this.caseID = this.navParams.get('id');
	}

	//When the view Loads
	ionViewDidLoad () {
		//this.resetFields();

		if (this.navParams.get('record')) {
			this.isEdited = true;
			console.log(this.navParams.get('record'));
			this.selectEntry(this.navParams.get('record'));
			this.pageTitle = 'Amend Entry';
		}
	}

	/* //Reset all the fields
	resetFields (): void {
		this.eventIncidentLocation = '';
		this.eventName = '';
		this.eventDateIncident = '';
		this.eventTimeIncident = '';
		this.eventActivity = '';
		this.eventFeet = false;
		this.eventAnkle = false;
		this.eventLeg = false;
		this.eventHand = false;
		this.eventFinger = false;
		this.eventAbdomen = false;
		this.eventChest = false;
		this.eventPrivatePart = false;
		this.eventOthers = '';
	} */

	selectEntry (item: any): void {
		this.caseID = item.caseID;
		this.eventIncidentLocation = item.eventIncidentLocation;
		this.eventName = item.eventName;
		this.eventDateIncident = item.eventDateIncident;
		this.eventTimeIncident = item.eventTimeIncident;
		this.eventActivity = item.eventActivity;
		this.eventFeet = item.eventFeet;
		this.eventAnkle = item.eventAnkle;
		this.eventLeg = item.eventLeg;
		this.eventHand = item.eventHand;
		this.eventFinger = item.eventFinger;
		this.eventAbdomen = item.eventAbdomen;
		this.eventChest = item.eventChest;
		this.eventPrivatePart = item.eventPrivatePart;
		this.eventOthers = item.eventOthers;
	}

	//Creates notification with a certain message
	sendNotification (message: string): void {
		let notification = this.toastCtrl.create({
			message: message,
			duration: 3000
		});
		notification.present();
	}

	/* goBack () {
		this.navCtrl.pop();
	} */

	/* //Create, Read, Update and Delete Functions

	createEntry (
		id: string,
		incidentLocation: string,
		name: string,
		dateIncident: string,
		timeIncident: string,
		activity: string,
		feet: boolean,
		ankle: boolean,
		leg: boolean,
		hand: boolean,
		finger: boolean,
		abdomen: boolean,
		chest: boolean,
		privatepart: boolean,
		others: string
	): void {
		let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = {
				key: 'create',
				id: id,
				incidentLocation: incidentLocation,
				name: name,
				dateIncident: dateIncident,
				timeIncident: timeIncident,
				activity: activity,
				feet: feet,
				ankle: ankle,
				leg: leg,
				hand: hand,
				finger: finger,
				abdomen: abdomen,
				chest: chest,
				privatepart: privatepart,
				others: others
			},
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				// If the request was successful notify the user
				this.hideForm = true;
				this.sendNotification(`Congratulations the technology: ${name} was successfully added`);
				this.goBack();
			},
			(error: any) => {
				this.sendNotification('Something went wrong!');
			}
		);
	}

	updateEntry (
		id: string,
		incidentLocation: string,
		name: string,
		dateIncident: string,
		timeIncident: string,
		activity: string,
		feet: boolean,
		ankle: boolean,
		leg: boolean,
		hand: boolean,
		finger: boolean,
		abdomen: boolean,
		chest: boolean,
		privatepart: boolean,
		others: string
	): void {
		let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = {
				key: 'update',
				id: id,
				incidentLocation: incidentLocation,
				name: name,
				dateIncident: dateIncident,
				timeIncident: timeIncident,
				activity: activity,
				feet: feet,
				ankle: ankle,
				leg: leg,
				hand: hand,
				finger: finger,
				abdomen: abdomen,
				chest: chest,
				privatepart: privatepart,
				others: others
			},
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				this.hideForm = true;
				this.sendNotification(`Congratulations the patient: ${name} was successfully updated`);
				this.navCtrl.setRoot(CaseListPage);
			},
			(error: any) => {
				this.sendNotification('Something went wrong!');
			}
		);
	}

	saveEntry (): void {
		let id: string = this.form.controls['id'].value,
			incidentLocation: string = this.form.controls['incidentLocation'].value,
			name: string = this.form.controls['name'].value,
			dateIncident: string = this.form.controls['dateIncident'].value,
			timeIncident: string = this.form.controls['timeIncident'].value,
			activity: string = this.form.controls['activity'].value,
			feet: boolean = this.form.controls['feet'].value,
			ankle: boolean = this.form.controls['ankle'].value,
			leg: boolean = this.form.controls['leg'].value,
			hand: boolean = this.form.controls['hand'].value,
			finger: boolean = this.form.controls['finger'].value,
			abdomen: boolean = this.form.controls['abdomen'].value,
			chest: boolean = this.form.controls['chest'].value,
			privatepart: boolean = this.form.controls['privatepart'].value,
			others: string = this.form.controls['others'].value;

		if (this.isEdited) {
			this.updateEntry(
				id,
				incidentLocation,
				name,
				dateIncident,
				timeIncident,
				activity,
				feet,
				ankle,
				leg,
				hand,
				finger,
				abdomen,
				chest,
				privatepart,
				others
			);
		} else {
			this.createEntry(
				id,
				incidentLocation,
				name,
				dateIncident,
				timeIncident,
				activity,
				feet,
				ankle,
				leg,
				hand,
				finger,
				abdomen,
				chest,
				privatepart,
				others
			);
		}
	} */
}
