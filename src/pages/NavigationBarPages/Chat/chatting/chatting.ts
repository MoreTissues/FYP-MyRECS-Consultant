import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

import { Component } from '@angular/core';
import { InnerChatPage } from '../inner-chat/inner-chat';

@IonicPage()
@Component({
	selector: 'page-chatting',
	templateUrl: 'chatting.html'
})
export class ChattingPage {
	username: any;

	constructor (public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {}

	showAlert (title: string, message: string) {
		let alertBox = this.alertCtrl.create({
			title: title,
			subTitle: message,
			buttons: [
				'OK'
			]
		});
		alertBox.present();
	}

	loginUser () {
		if (/^[a-zA-Z0-9]+$/.test(this.username)) {
			this.navCtrl.push(InnerChatPage, {
				username: this.username
			});
		} else {
			this.showAlert('Error', 'Invalid Username');
		}
	}
}
