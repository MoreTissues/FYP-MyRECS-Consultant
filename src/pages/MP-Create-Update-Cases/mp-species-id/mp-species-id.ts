import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
	selector: 'page-mp-species-id',
	templateUrl: 'mp-species-id.html'
})
export class MpSpeciesIdPage {
	caseID: any;
	public photos: any;
	public base64Image: string;
	public fileImage: string;
	public responseData: any;
	userData = { imageB64: '' };
	snake: any;
	form: FormGroup;
	selectValue: string;
	selectValue01: string;
	imageDataStore: any;
	option: any;

	speciesSpecimen: any;
	speciesAvailable: any;
	speciesSnakes: any;
	speciesChracteristics: any;
	speciesSnakeImage: any;
	buttonTitle: any;
	imageDes: any;

	//Flag to be used for checking whether we are adding/editing an entry
	isEdited: boolean = false;

	//Flag to hide the form upon successful completion of remote operation
	hideForm: boolean = false;

	//Property to help set the page title
	pageTitle: string;

	//Remote URI for retrieving data from and sending data to
	private baseURI: string = 'http://lrgs.ftsm.ukm.my/users/a161032/FYP/SpeciesCRUD/';

	private imgURL: any = 'http://lrgs.ftsm.ukm.my/users/a161032/FYP/SpeciesCRUD/images/';

	//Functions for Select Snakes
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

	selectedArray: any = [];

	checkAll () {
		for (let i = 0; i <= this.optionsSnakes.length; i++) {
			this.optionsSnakes[i].checked = true;
		}
		console.log(this.optionsSnakes);
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
		this.selectValue = this.selectedArray.map((x) => x.name).join(',');
		console.log(this.selectedArray);
	}

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
			snake: [
				'',
				Validators.required
			],
			specimen: [
				'',
				Validators.required
			],
			available: [
				'',
				Validators.required
			],
			chracteristics: [
				'',
				Validators.required
			]
		});
		this.caseID = this.navParams.get('id');
	}

	//When the view Loads
	ionViewDidLoad () {
		this.photos = [];
		//this.resetFields();

		if (this.navParams.get('record')) {
			this.isEdited = true;
			this.selectEntry(this.navParams.get('record'));
			this.pageTitle = 'Amend Entry';
			this.buttonTitle = 'Update Picture';
			this.imageDes = 'Picture that had been uploaded will be shown below';
			this.option = 'Previous Option Selected';
		}
	}

	/* //Reset all the fields
	resetFields (): void {
		this.speciesSpecimen = '';
		this.speciesAvailable = '';
		this.speciesSnakes = '';
		this.speciesChracteristics = '';
	} */

	selectEntry (item: any): void {
		this.caseID = item.caseID;
		this.speciesSpecimen = item.speciesSpecimen;
		this.speciesAvailable = item.speciesAvailable;
		this.selectValue01 = item.speciesSnakes;
		this.speciesChracteristics = item.speciesChracteristics;
		this.speciesSnakeImage = this.imgURL + item.speciesSnakeImage;
	}

	/* upload () {
		const options: CameraOptions = {
			quality: 70,
			sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
		};

		this.camera.getPicture(options).then((imageData) => {
			let options1: FileUploadOptions = {
				fileKey: 'file',
				fileName: this.caseID + '.jpg',
				headers: {}
			};

			this.speciesSnakeImage = options1.fileName;
			console.log(options1.fileName);
			const fileTransfer: FileTransferObject = this.transfer.create();

			fileTransfer
				.upload(imageData, 'http://lrgs.ftsm.ukm.my/users/a161032/FYP/SpeciesCRUD/uploadImage.php', options1)
				.then(
					(data) => {
						// success
						alert('success');
					},
					(err) => {
						// error
						alert('error' + JSON.stringify(err));
					}
				);
		});
		//random int
	}

	createEntry (
		id: string,
		specimen: string,
		available: string,
		snakes: string,
		chracteristics: string,
		base64Image: string
	): void {
		let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = {
				key: 'create',
				id: id,
				specimen: specimen,
				available: available,
				snakes: snakes,
				chracteristics: chracteristics,
				base64Image: base64Image
			},
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				alert(`Congratulations the Species ${id} is Created`);
				// If the request was successful notify the user
				console.log(`Congratulations the Species ${id} is Created`);
			},
			(error: any) => {
				alert('Something went wrong!');
				console.log('Something went wrong!');
			}
		);
	}

	updateEntry (
		id: string,
		specimen: string,
		available: string,
		snakes: string,
		chracteristics: string,
		base64Image: string
	): void {
		let headers: any = new HttpHeaders({ 'Content-Type': 'application/json' }),
			options: any = {
				key: 'update',
				id: id,
				specimen: specimen,
				available: available,
				snakes: snakes,
				chracteristics: chracteristics,
				base64Image: base64Image
			},
			url: any = this.baseURI + 'manage_data.php';

		this.http.post(url, JSON.stringify(options), headers).subscribe(
			(data: any) => {
				// If the request was successful notify the user
				console.log(`Congratulations the Species ${id} is Updated`);
			},
			(error: any) => {
				console.log('Something went wrong!');
			}
		);
	}

	saveEntry (): void {
		let id: string = this.form.controls['id'].value,
			specimen: string = this.form.controls['specimen'].value,
			available: string = this.form.controls['available'].value,
			snakes: any = this.selectValue,
			chracteristics: any = this.form.controls['chracteristics'].value,
			base64Image: any = this.speciesSnakeImage;

		if (this.isEdited) {
			this.updateEntry(id, specimen, available, snakes, chracteristics, base64Image);
		} else {
			this.createEntry(id, specimen, available, snakes, chracteristics, base64Image);
		}
	} */
}
