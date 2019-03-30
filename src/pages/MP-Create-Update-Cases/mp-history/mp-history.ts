import { CaseListPage } from './../../NavigationBarPages/case-list/case-list';
import { AlertController, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'page-mp-history',
	templateUrl: 'mp-history.html'
})
export class MpHistoryPage {
	option: any;
	//Show Previous Values
	selectValue01: string;
	selectValue02: string;
	selectValue03: string;

	//Show Current Values
	selectValue: string;
	selectValue1: string;
	selectValue2: string;

	caseID: any;
	form: FormGroup;
	member: any;
	member1: any;
	member2: any;
	historyDoneAffectedArea: any;
	historyOthersAffectedArea: any;
	historyPresentConditions: any;
	historyOthersPresentCondition: any;
	historyGeneralExamination: any;
	historyAllergies: any;
	historyMedicalHistory: any;
	historyMedicationUse: any;

	//Flag to be used for checking whether we are adding/editing an entry
	isEdited: boolean = false;

	//Flag to hide the form upon successful completion of remote operation
	hideForm: boolean = false;

	//Property to help set the page title
	pageTitle: string;

	//Property to store the recordID for when an existing entry is being edited
	historyID: any = null;

	//Remote URI for retrieving data from and sending data to
	//private baseURI: string = 'http://lrgs.ftsm.ukm.my/users/a161032/FYP/HistoryCRUD/';

	/* //Functions for Done Affected Area
	optionsAffect: any = [
		{ optionID: 1, name: 'Immobolise', checked: false },
		{ optionID: 2, name: 'Pressure Bandaging', checked: false },
		{ optionID: 3, name: 'Cut', checked: false },
		{ optionID: 4, name: 'Suck', checked: false },
		{ optionID: 5, name: 'Apply Ointment', checked: false },
		{ optionID: 6, name: 'Squeeze', checked: false },
		{ optionID: 7, name: 'Massage', checked: false },
		{ optionID: 8, name: 'Tourniquet', checked: false },
		{ optionID: 9, name: 'Apply Ice', checked: false },
		{ optionID: 10, name: 'Wash', checked: false }
	];

	selectedArray: any = [];

	checkAll () {
		for (let i = 0; i <= this.optionsAffect.length; i++) {
			this.optionsAffect[i].checked = true;
		}
		console.log(this.optionsAffect);
	}

	selectMember (data) {
		if (data.checked == true) {
			this.selectedArray.push(data);
		} else {
			let newArray = this.selectedArray.filter(function (el) {
				return el.optionID !== data.optionID;
			});
			this.selectedArray = newArray;
		}
		console.log(this.selectedArray.map((x) => x.name).join(','));
		this.selectValue = this.selectedArray.map((x) => x.name).join('||');
		console.log(this.selectedArray);
	}

	//Functions for Present Conditions
	optionsConditions: any = [
		{ optionID: 1, name: 'Stable/Alert', checked: false },
		{ optionID: 2, name: 'Bite Mark Seen', checked: false },
		{ optionID: 3, name: 'Necrosis', checked: false },
		{ optionID: 4, name: 'Nausea/Vomiting', checked: false },
		{ optionID: 5, name: 'Echymosis (bruising)', checked: false },
		{ optionID: 6, name: 'Bleeding', checked: false },
		{ optionID: 7, name: 'Blisters', checked: false },
		{ optionID: 8, name: 'Chest Pain', checked: false },
		{ optionID: 9, name: 'Edema (swelling)', checked: false },
		{ optionID: 10, name: 'Unconscious', checked: false },
		{ optionID: 11, name: 'Lymph Anodes Palpable', checked: false },
		{ optionID: 12, name: 'Flubor', checked: false },
		{ optionID: 13, name: 'Laceration', checked: false },
		{ optionID: 14, name: 'Bullae', checked: false },
		{ optionID: 15, name: 'Ulcer', checked: false }
	];

	selectedArray1: any = [];

	checkAll1 () {
		for (let i = 0; i <= this.optionsConditions.length; i++) {
			this.optionsConditions[i].checked = true;
		}
		console.log(this.optionsConditions);
	}

	selectMember1 (data) {
		if (data.checked == true) {
			this.selectedArray1.push(data);
		} else {
			let newArray = this.selectedArray1.filter(function (el) {
				return el.optionID !== data.optionID;
			});
			this.selectedArray1 = newArray;
		}
		console.log(this.selectedArray1.map((x) => x.name).join(','));
		this.selectValue1 = this.selectedArray1.map((x) => x.name).join('||');
		console.log(this.selectedArray1);
	}

	//Functions for General Examination
	optionsGeneral: any = [
		{ optionID: 1, name: 'Stable/Alert', checked: false },
		{ optionID: 2, name: 'Bite Mark Seen', checked: false },
		{ optionID: 3, name: 'Necrosis', checked: false }
	];

	selectedArray2: any = [];

	checkAll2 () {
		for (let i = 0; i <= this.optionsGeneral.length; i++) {
			this.optionsGeneral[i].checked = true;
		}
		console.log(this.optionsGeneral);
	}

	selectMember2 (data) {
		if (data.checked == true) {
			this.selectedArray2.push(data);
		} else {
			let newArray = this.selectedArray2.filter(function (el) {
				return el.optionID !== data.optionID;
			});
			this.selectedArray2 = newArray;
		}
		console.log(this.selectedArray2.map((x) => x.name).join(','));
		this.selectValue2 = this.selectedArray2.map((x) => x.name).join('||');
		console.log(this.selectedArray2);
	} */

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
			member2: [
				'',
				Validators.required
			],
			member1: [
				'',
				Validators.required
			],
			member: [
				'',
				Validators.required
			],
			doneAffectedArea: [
				'',
				Validators.required
			],
			othersAffectedArea: [
				'',
				Validators.required
			],
			presentConditions: [
				'',
				Validators.required
			],
			othersPresentCondition: [
				'',
				Validators.required
			],
			generalExamination: [
				'',
				Validators.required
			],
			allergies: [
				'',
				Validators.required
			],
			medicalHistory: [
				'',
				Validators.required
			],
			medicationUse: [
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
			this.option = 'Previous Option Selected';
		}
	}

	/* //Reset all the fields
	resetFields (): void {
		this.historyDoneAffectedArea = '';
		this.historyOthersAffectedArea = '';
		this.historyPresentConditions = '';
		this.historyOthersPresentCondition = '';
		this.historyGeneralExamination = '';
		this.historyAllergies = '';
		this.historyMedicalHistory = '';
		this.historyMedicationUse = '';
	} */

	selectEntry (item: any): void {
		this.caseID = item.caseID;
		this.selectValue01 = item.historyDoneAffectedArea;
		this.historyOthersAffectedArea = item.historyOthersAffectedArea;
		this.selectValue02 = item.historyPresentConditions;
		this.historyOthersPresentCondition = item.historyOthersPresentCondition;
		this.selectValue03 = item.historyGeneralExamination;
		this.historyAllergies = item.historyAllergies;
		this.historyMedicalHistory = item.historyMedicalHistory;
		this.historyMedicationUse = item.historyMedicationUse;
	}

	//Creates notification with a certain message
	sendNotification (message: string): void {
		let notification = this.toastCtrl.create({
			message: message,
			duration: 3000
		});
		notification.present();
	}

	/* showConfirmDialogDelete () {
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
					handler: () => {}
				}
			]
		});
		confirm.present();
	}

	goBack () {
		this.navCtrl.pop();
	}
	//Create, Read, Update and Delete Functions

	createEntry (
		id: string,
		doneAffectedArea: string,
		othersAffectedArea: string,
		presentConditions: string,
		othersPresentCondition: string,
		generalExamination: string,
		allergies: string,
		medicalHistory: string,
		medicationUse: string
	): void {
		let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = {
				key: 'create',
				id: id,
				doneAffectedArea: doneAffectedArea,
				othersAffectedArea: othersAffectedArea,
				presentConditions: presentConditions,
				othersPresentCondition: othersPresentCondition,
				generalExamination: generalExamination,
				allergies: allergies,
				medicalHistory: medicalHistory,
				medicationUse: medicationUse
			},
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				// If the request was successful notify the user
				this.hideForm = true;
				this.sendNotification(`Congratulations the technology: ${id} was successfully added`);
				this.goBack();
			},
			(error: any) => {
				this.sendNotification('Something went wrong!');
			}
		);
	}

	updateEntry (
		id: string,
		doneAffectedArea: string,
		othersAffectedArea: string,
		presentConditions: string,
		othersPresentCondition: string,
		generalExamination: string,
		allergies: string,
		medicalHistory: string,
		medicationUse: string
	): void {
		let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = {
				key: 'update',
				id: id,
				doneAffectedArea: doneAffectedArea,
				othersAffectedArea: othersAffectedArea,
				presentConditions: presentConditions,
				othersPresentCondition: othersPresentCondition,
				generalExamination: generalExamination,
				allergies: allergies,
				medicalHistory: medicalHistory,
				medicationUse: medicationUse
			},
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				// If the request was successful notify the user
				this.hideForm = true;
				this.sendNotification(`Congratulations the technology: ${id} was successfully updated`);
				this.navCtrl.setRoot(CaseListPage);
			},
			(error: any) => {
				this.sendNotification('Something went wrong!');
			}
		);
	}

	saveEntry (): void {
		let id: string = this.form.controls['id'].value,
			doneAffectedArea: string = this.selectValue,
			othersAffectedArea: string = this.form.controls['othersAffectedArea'].value,
			presentConditions: string = this.selectValue1,
			othersPresentCondition: string = this.form.controls['othersPresentCondition'].value,
			generalExamination: string = this.selectValue2,
			allergies: string = this.form.controls['allergies'].value,
			medicalHistory: string = this.form.controls['medicalHistory'].value,
			medicationUse: string = this.form.controls['medicationUse'].value;

		if (this.isEdited) {
			this.updateEntry(
				id,
				doneAffectedArea,
				othersAffectedArea,
				presentConditions,
				othersPresentCondition,
				generalExamination,
				allergies,
				medicalHistory,
				medicationUse
			);
		} else {
			this.createEntry(
				id,
				doneAffectedArea,
				othersAffectedArea,
				presentConditions,
				othersPresentCondition,
				generalExamination,
				allergies,
				medicalHistory,
				medicationUse
			);
		}
	}

	print () {} */
}
