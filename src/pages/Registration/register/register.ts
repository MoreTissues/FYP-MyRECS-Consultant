import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../../../models/user';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-register',
	templateUrl: 'register.html'
})
export class RegisterPage {
	user = {} as User;
	constructor (public navCtrl: NavController, public navParams: NavParams, private afAuth: AngularFireAuth) {}

	async register (user: User) {
		try {
			const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
			if (result) {
				this.navCtrl.setRoot(ProfilePage);
			}
		} catch (e) {
			console.error(e);
		}
	}
}
