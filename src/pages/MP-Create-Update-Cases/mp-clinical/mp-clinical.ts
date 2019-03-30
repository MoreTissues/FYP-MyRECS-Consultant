import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'page-mp-clinical',
	templateUrl: 'mp-clinical.html'
})
export class MpClinicalPage {
	form: FormGroup;
	caseID: any;

	//Medication (5)
	clinicalName: any;
	clinicalFreq: any;
	clinicalTimeGiven: any;
	clinicalTimeComplete: any;
	clinicalReaction: any;

	//PSP (12)
	clinicalIncidentTime: any;
	clinicalIncidentScore: any;
	clinicalArrival1Time: any;
	clinicalArrival1Score: any;
	clinicalAnalgesia1Time: any;
	clinicalAnalgesia1Score: any;
	clinicalArrival2Time: any;
	clinicalArrival2Score: any;
	clinicalAnalgesia2Time: any;
	clinicalAnalgesia2Score: any;
	clinicalCurrentlyTime: any;
	clinicalCurrentlyScore: any;

	//SBR (10)
	clinical20WBTC: any;
	clinicalWBC: any;
	clinicalHB: any;
	clinicalPLT: any;
	clinicalAPTT: any;
	clinicalGSC: any;
	clinicalBRF: any;
	clinicalPSP: any;
	clinicalRR: any;
	clinicalAPI: any;

	//Flag to be used for checking whether we are adding/editing an entry
	isEdited: boolean = false;

	//Flag to hide the form upon successful completion of remote operation
	hideForm: boolean = false;

	//Property to help set the page title
	pageTitle: string;

	//Remote URI for retrieving data from and sending data to
	//private baseURI: string = 'http://lrgs.ftsm.ukm.my/users/a161032/FYP/ClinicalCRUD/';

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
			name: [
				'',
				Validators.required
			],
			freq: [
				'',
				Validators.required
			],
			timeGiven: [
				'',
				Validators.required
			],
			timeComplete: [
				'',
				Validators.required
			],
			reaction: [
				'',
				Validators.required
			],
			incidentTime: [
				'',
				Validators.required
			],
			incidentScore: [
				'',
				Validators.required
			],
			arrival1Time: [
				'',
				Validators.required
			],
			arrival1Score: [
				'',
				Validators.required
			],
			analgesia1Time: [
				'',
				Validators.required
			],
			analgesia1Score: [
				'',
				Validators.required
			],
			arrival2Time: [
				'',
				Validators.required
			],
			arrival2Score: [
				'',
				Validators.required
			],
			analgesia2Time: [
				'',
				Validators.required
			],
			analgesia2Score: [
				'',
				Validators.required
			],
			currentlyTime: [
				'',
				Validators.required
			],
			currentlyScore: [
				'',
				Validators.required
			],
			WBC: [
				'',
				Validators.required
			],
			WBCT: [
				'',
				Validators.required
			],
			HB: [
				'',
				Validators.required
			],
			PLT: [
				'',
				Validators.required
			],
			APTT: [
				'',
				Validators.required
			],
			GSC: [
				'',
				Validators.required
			],
			BRF: [
				'',
				Validators.required
			],
			PSP: [
				'',
				Validators.required
			],
			RR: [
				'',
				Validators.required
			],
			API: [
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
		//Medication
		this.clinicalName = '';
		this.clinicalFreq = '';
		this.clinicalTimeGiven = '';
		this.clinicalTimeComplete = '';
		this.clinicalReaction = '';

		//PSP
		this.clinicalIncidentTime = '';
		this.clinicalIncidentScore = '';
		this.clinicalArrival1Time = '';
		this.clinicalArrival1Score = '';
		this.clinicalAnalgesia1Time = '';
		this.clinicalAnalgesia1Score = '';
		this.clinicalArrival2Time = '';
		this.clinicalArrival2Score = '';
		this.clinicalAnalgesia2Time = '';
		this.clinicalAnalgesia2Score = '';
		this.clinicalCurrentlyTime = '';
		this.clinicalCurrentlyScore = '';

		//SBR
		this.clinical20WBTC = '';
		this.clinicalWBC = '';
		this.clinicalHB = '';
		this.clinicalPLT = '';
		this.clinicalAPTT = '';
		this.clinicalGSC = '';
		this.clinicalBRF = '';
		this.clinicalPSP = '';
		this.clinicalRR = '';
		this.clinicalAPI = '';
	} */

	selectEntry (item: any): void {
		this.caseID = item.caseID;
		//Medication
		this.clinicalName = item.clinicalName;
		this.clinicalFreq = item.clinicalFreq;
		this.clinicalTimeGiven = item.clinicalTimeGiven;
		this.clinicalTimeComplete = item.clinicalTimeComplete;
		this.clinicalReaction = item.clinicalReaction;

		//PSP
		this.clinicalIncidentTime = item.clinicalIncidentTime;
		this.clinicalIncidentScore = item.clinicalIncidentScore;
		this.clinicalArrival1Time = item.clinicalArrival1Time;
		this.clinicalArrival1Score = item.clinicalArrival1Score;
		this.clinicalAnalgesia1Time = item.clinicalAnalgesia1Time;
		this.clinicalAnalgesia1Score = item.clinicalAnalgesia1Score;
		this.clinicalArrival2Time = item.clinicalArrival2Time;
		this.clinicalArrival2Score = item.clinicalArrival2Score;
		this.clinicalAnalgesia2Time = item.clinicalAnalgesia2Time;
		this.clinicalAnalgesia2Score = item.clinicalAnalgesia2Score;
		this.clinicalCurrentlyTime = item.clinicalCurrentlyTime;
		this.clinicalCurrentlyScore = item.clinicalCurrentlyScore;

		//SBR
		this.clinical20WBTC = item.clinical20WBTC;
		this.clinicalWBC = item.clinicalWBC;
		this.clinicalHB = item.clinicalHB;
		this.clinicalPLT = item.clinicalPLT;
		this.clinicalAPTT = item.clinicalAPTT;
		this.clinicalGSC = item.clinicalGSC;
		this.clinicalBRF = item.clinicalBRF;
		this.clinicalPSP = item.clinicalPSP;
		this.clinicalRR = item.clinicalRR;
		this.clinicalAPI = item.clinicalAPI;
	}

	/* //Creates notification with a certain message
	sendNotification (message: string): void {
		let notification = this.toastCtrl.create({
			message: message,
			duration: 3000
		});
		notification.present();
	}

	goBack () {
		this.navCtrl.pop();
	}

	//Create, Read, Update and Delete Functions

	createEntry (
		id: string,
		//Medication
		name: string,
		freq: string,
		timeGiven: string,
		timeComplete: string,
		reaction: string,
		//PSP
		incidentTime: string,
		incidentScore: number,
		arrival1Time: string,
		arrival1Score: number,
		analgesia1Time: string,
		analgesia1Score: number,
		arrival2Time: string,
		arrival2Score: number,
		analgesia2Time: string,
		analgesia2Score: number,
		currentlyTime: string,
		currentlyScore: number,
		//SBR
		WBC: number,
		WBCT: number,
		HB: number,
		PLT: number,
		APTT: number,
		GSC: number,
		BRF: number,
		PSP: number,
		RR: number,
		API: number
	): void {
		let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = {
				key: 'create',
				id: id,
				//Medication
				name: name,
				freq: freq,
				timeGiven: timeGiven,
				timeComplete: timeComplete,
				reaction: reaction,

				//PSP
				incidentTime: incidentTime,
				incidentScore: incidentScore,
				arrival1Time: arrival1Time,
				arrival1Score: arrival1Score,
				analgesia1Time: analgesia1Time,
				analgesia1Score: analgesia1Score,
				arrival2Time: arrival2Time,
				arrival2Score: arrival2Score,
				analgesia2Time: analgesia2Time,
				analgesia2Score: analgesia2Score,
				currentlyTime: currentlyTime,
				currentlyScore: currentlyScore,

				//SBR
				WBC: WBC,
				WBCT: WBCT,
				HB: HB,
				PLT: PLT,
				APTT: APTT,
				GSC: GSC,
				BRF: BRF,
				PSP: PSP,
				RR: RR,
				API: API
			},
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				// If the request was successful notify the user
				this.hideForm = true;
				this.sendNotification(`Congratulations the clinical: ${id} was successfully added`);
				this.goBack();
			},
			(error: any) => {
				this.sendNotification('Something went wrong!');
			}
		);
	}

	updateEntry (
		id: string,
		//Medication
		name: string,
		freq: string,
		timeGiven: string,
		timeComplete: string,
		reaction: string,
		//PSP
		incidentTime: string,
		incidentScore: number,
		arrival1Time: string,
		arrival1Score: number,
		analgesia1Time: string,
		analgesia1Score: number,
		arrival2Time: string,
		arrival2Score: number,
		analgesia2Time: string,
		analgesia2Score: number,
		currentlyTime: string,
		currentlyScore: number,
		//SBR
		WBC: number,
		WBCT: number,
		HB: number,
		PLT: number,
		APTT: number,
		GSC: number,
		BRF: number,
		PSP: number,
		RR: number,
		API: number
	): void {
		let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = {
				key: 'update',
				id: id,
				//Medication
				name: name,
				freq: freq,
				timeGiven: timeGiven,
				timeComplete: timeComplete,
				reaction: reaction,

				//PSP
				incidentTime: incidentTime,
				incidentScore: incidentScore,
				arrival1Time: arrival1Time,
				arrival1Score: arrival1Score,
				analgesia1Time: analgesia1Time,
				analgesia1Score: analgesia1Score,
				arrival2Time: arrival2Time,
				arrival2Score: arrival2Score,
				analgesia2Time: analgesia2Time,
				analgesia2Score: analgesia2Score,
				currentlyTime: currentlyTime,
				currentlyScore: currentlyScore,

				//SBR
				WBC: WBC,
				WBCT: WBCT,
				HB: HB,
				PLT: PLT,
				APTT: APTT,
				GSC: GSC,
				BRF: BRF,
				PSP: PSP,
				RR: RR,
				API: API
			},
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				// If the request was successful notify the user
				this.hideForm = true;
				this.sendNotification(`Congratulations the clinical: ${id} was successfully updated`);
				this.goBack();
			},
			(error: any) => {
				this.sendNotification('Something went wrong!');
			}
		);
	}

	saveEntry (): void {
		let id: string = this.form.controls['id'].value,
			//Medication
			name: string = this.form.controls['name'].value,
			freq: string = this.form.controls['freq'].value,
			timeGiven: string = this.form.controls['timeGiven'].value,
			timeComplete: string = this.form.controls['timeComplete'].value,
			reaction: string = this.form.controls['reaction'].value,
			//PSP
			incidentTime: string = this.form.controls['incidentTime'].value,
			incidentScore: number = this.form.controls['incidentScore'].value,
			arrival1Time: string = this.form.controls['arrival1Time'].value,
			arrival1Score: number = this.form.controls['arrival1Score'].value,
			analgesia1Time: string = this.form.controls['analgesia1Time'].value,
			analgesia1Score: number = this.form.controls['analgesia1Score'].value,
			arrival2Time: string = this.form.controls['arrival2Time'].value,
			arrival2Score: number = this.form.controls['arrival2Score'].value,
			analgesia2Time: string = this.form.controls['analgesia2Time'].value,
			analgesia2Score: number = this.form.controls['analgesia2Score'].value,
			currentlyTime: string = this.form.controls['currentlyTime'].value,
			currentlyScore: number = this.form.controls['currentlyScore'].value,
			//SBR
			WBC: number = this.form.controls['WBC'].value,
			WBCT: number = this.form.controls['WBCT'].value,
			HB: number = this.form.controls['HB'].value,
			PLT: number = this.form.controls['PLT'].value,
			APTT: number = this.form.controls['APTT'].value,
			GSC: number = this.form.controls['GSC'].value,
			BRF: number = this.form.controls['BRF'].value,
			PSP: number = this.form.controls['PSP'].value,
			RR: number = this.form.controls['RR'].value,
			API: number = this.form.controls['API'].value;

		if (this.isEdited) {
			this.updateEntry(
				id,
				//Medication
				name,
				freq,
				timeGiven,
				timeComplete,
				reaction,
				//PSP
				incidentTime,
				incidentScore,
				arrival1Time,
				arrival1Score,
				analgesia1Time,
				analgesia1Score,
				arrival2Time,
				arrival2Score,
				analgesia2Time,
				analgesia2Score,
				currentlyTime,
				currentlyScore,
				//SBR
				WBC,
				WBCT,
				HB,
				PLT,
				APTT,
				GSC,
				BRF,
				PSP,
				RR,
				API
			);
		} else {
			this.createEntry(
				id,
				//Medication
				name,
				freq,
				timeGiven,
				timeComplete,
				reaction,
				//PSP
				incidentTime,
				incidentScore,
				arrival1Time,
				arrival1Score,
				analgesia1Time,
				analgesia1Score,
				arrival2Time,
				arrival2Score,
				analgesia2Time,
				analgesia2Score,
				currentlyTime,
				currentlyScore,
				//SBR
				WBC,
				WBCT,
				HB,
				PLT,
				APTT,
				GSC,
				BRF,
				PSP,
				RR,
				API
			);
		}
	} */
}
