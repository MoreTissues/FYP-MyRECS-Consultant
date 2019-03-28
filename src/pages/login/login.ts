import { IonicPage, NavController } from 'ionic-angular';
import { Observable } from 'rxjs';

import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { User } from '../../models/user';
import { AuthProvider } from '../../providers/auth/auth';
import { RegisterPage } from '../register/register';

@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	user = {} as User;
	profileData: Observable<any>;

	constructor (public navCtrl: NavController, private _AUTH: AuthProvider, private afAuth: AngularFireAuth) {}

	async login (user: User) {
		try {
			const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
			if (result && user.usertype == 'recs') {
				this._AUTH.showAlertSucceed();
				//this.navCtrl.setRoot(CaseListPage);
			} else if (result && user.usertype == 'mp') {
				this._AUTH.showAlertSucceed();
				//this.navCtrl.setRoot(CaseListPage);
			}
		} catch (e) {
			console.error(e);
		}
	}
	register () {
		this.navCtrl.push(RegisterPage);
	}
}
