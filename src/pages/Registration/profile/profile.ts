import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFireDatabase } from '@angular/fire/database';

import { Profile } from '../../../models/profile';
import { LoginPage } from '../../login/login';

@IonicPage()
@Component({
	selector: 'page-profile',
	templateUrl: 'profile.html'
})
export class ProfilePage {
	profile = {} as Profile;

	constructor (
		public navCtrl: NavController,
		public navParams: NavParams,
		private afAuth: AngularFireAuth,
		private afDatabase: AngularFireDatabase
	) {}

	ionViewDidLoad () {
		console.log('ionViewDidLoad ProfilePage');
	}

	createProfile () {
		this.afAuth.authState.take(1).subscribe((auth) => {
			this.afDatabase.object(`profile/${auth.uid}`).set(this.profile).then(() => this.navCtrl.setRoot(LoginPage));
		});
	}
}
