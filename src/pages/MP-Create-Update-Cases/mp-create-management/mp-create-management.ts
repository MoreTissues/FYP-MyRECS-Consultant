import { IonicPage, NavController, NavParams, Item, ItemSliding } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'page-mp-create-management',
	templateUrl: 'mp-create-management.html'
})
export class MpCreateManagementPage {
	form: FormGroup;
	caseID: any;
	activeItemSliding: ItemSliding = null;

	//Image uploaded by MP
	speciesSnake: any;

	//Sections need to fill in by Consultant
	managementTypeSpecies: any;
	managementAntivenomRecommended: any;
	managementPlan: any;
	managementSnakeChoosen: any;
	managementWorkingDiagnosis: any;
	managementComments: any;

	//Flag to be used for checking whether we are adding/editing an entry
	isEdited: boolean = false;

	//Flag to hide the form upon successful completion of remote operation
	hideForm: boolean = false;

	//Property to help set the page title
	pageTitle: string;

	//Remote URI for retrieving data from and sending data to
	private baseURI: string = 'http://lrgs.ftsm.ukm.my/users/a161032/FYP/ManagementCRUD/';

	private imgURL: any = 'http://lrgs.ftsm.ukm.my/users/a161032/FYP/SpeciesCRUD/images/';

	optionsSnakes: any = [
		{ optionID: 1, name: 'Bungarus Candidus', pic: 'assets/imgs/BungarusCandidus.png', checked: false },
		{ optionID: 2, name: 'Bungarus Fasciatus', pic: 'assets/imgs/BungarusFasciatus.png', checked: false },
		{ optionID: 3, name: 'Calliophis Bivirgatus', pic: 'assets/imgs/CalliophisBivirgatus.png', checked: false },
		{ optionID: 4, name: 'Garthius Chaseni', pic: 'assets/imgs/GarthiusChaseni.png', checked: false },
		{ optionID: 5, name: 'Naja Sumatrana', pic: 'assets/imgs/NajaSumatrana.png', checked: false },
		{ optionID: 6, name: 'Trimeresurus Wiroti', pic: 'assets/imgs/TrimeresurusWiroti.png', checked: false },
		{ optionID: 7, name: 'Python Breitensteini', pic: 'assets/imgs/PythonBreitensteini.png', checked: false },
		{ optionID: 8, name: 'Trimeresurus Sabahi', pic: 'assets/imgs/TrimeresurusSabahi.png', checked: false }
	];

	constructor (
		public navCtrl: NavController,
		private camera: Camera,
		public http: HttpClient,
		private transfer: FileTransfer,
		public navParams: NavParams,
		public fb: FormBuilder
	) {
		this.form = fb.group({
			id: [
				'',
				Validators.required
			],
			typeSpecies: [
				'',
				Validators.required
			],
			antivenomRecommended: [
				'',
				Validators.required
			],
			plan: [
				'',
				Validators.required
			],
			snakeChoosen: [
				'',
				Validators.required
			],
			workingDiagnosis: [
				'',
				Validators.required
			],
			comments: [
				'',
				Validators.required
			]
		});
	}

	ionViewDidLoad () {
		//this.resetFields();

		if (this.navParams.get('record')) {
			console.log(this.navParams.get('record'));
			this.selectEntry(this.navParams.get('record'));
			this.isEdited = true;
		} else {
			this.isEdited = false;
			this.selectEntry(this.navParams.get('record'));
			this.caseID = this.navParams.get('record');
		}
	}

	//Reset all the fields
	resetFields (): void {
		this.managementTypeSpecies = '';
		this.managementAntivenomRecommended = '';
		this.managementPlan = '';
		this.managementSnakeChoosen = '';
		this.managementWorkingDiagnosis = '';
		this.managementComments = '';
	}

	selectEntry (item: any): void {
		this.caseID = item.caseID;
		this.managementTypeSpecies = item.managementTypeSpecies;
		this.managementPlan = item.managementPlan;
		this.managementPlan = item.managementPlan;
		this.managementSnakeChoosen = item.managementSnakeChoosen;
		this.managementWorkingDiagnosis = item.managementSnakeChoosen;
		this.managementComments = item.managementSnakeChoosen;
		this.speciesSnake = this.imgURL + item.caseID + '.jpg';
		console.log(this.speciesSnake);
	}

	createEntry (
		id: string,
		typeSpecies: string,
		antivenomRecommended: string,
		plan: string,
		snakeChoosen: string,
		workingDiagnosis: string,
		comments: string
	): void {
		let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = {
				key: 'create',
				id: id,
				typeSpecies: typeSpecies,
				antivenomRecommended: antivenomRecommended,
				plan: plan,
				snakeChoosen: snakeChoosen,
				workingDiagnosis: workingDiagnosis,
				comments: comments
			},
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				alert(`Congratulations the Species ${id} is Created`);
				// If the request was successful notify the user
				console.log(`Congratulations the Management ${id} is Created`);
			},
			(error: any) => {
				alert('Something went wrong!');
				console.log('Something went wrong!');
			}
		);
	}

	saveEntry (): void {
		let id: string = this.form.controls['id'].value,
			typeSpecies: string = this.form.controls['typeSpecies'].value,
			antivenomRecommended: string = this.form.controls['antivenomRecommended'].value,
			plan: any = this.form.controls['plan'].value,
			snakeChoosen: any = this.form.controls['snakeChoosen'].value,
			workingDiagnosis: any = this.form.controls['workingDiagnosis'].value,
			comments: any = this.form.controls['comments'].value;

		this.createEntry(id, typeSpecies, antivenomRecommended, plan, snakeChoosen, workingDiagnosis, comments);
	}
}
