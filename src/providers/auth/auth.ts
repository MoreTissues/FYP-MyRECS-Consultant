import 'rxjs/add/operator/map';

// DON'T forget to import the Firebase node package!
import * as firebase from 'firebase';
import { AlertController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

@Injectable()
export class AuthProvider {
	public user: Observable<any>;

	constructor (public http: Http, public alrtCtrl: AlertController) {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// User is signed in.
				console.log('User is signed in');
			} else {
				// No user is signed in.
				console.log('User is NOT signed in');
			}
		});
	}

	/**
    * Log out with Firebase Web API signOut method
    *
    * @method logOut
    * @return {Promise}
    */
	logOut (): Promise<any> {
		return new Promise((resolve, reject) => {
			firebase
				.auth()
				.signOut()
				.then(() => {
					resolve(true);
				})
				.catch((error: any) => {
					reject(error);
				});
		});
	}

	showAlertFail () {
		const alert = this.alrtCtrl.create({
			title: 'Error',
			subTitle: 'The Email or Password you have type does not match the database',
			buttons: [
				'OK'
			]
		});
		alert.present();
	}

	showAlertSucceed () {
		const alert = this.alrtCtrl.create({
			title: 'Congrats!',
			subTitle: 'Welcome to MyRECS',
			buttons: [
				'OK'
			]
		});
		alert.present();
	}
}
