import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';

@IonicPage()
@Component({
	selector: 'page-inner-chat',
	templateUrl: 'inner-chat.html'
})
export class InnerChatPage {
	username: any;
	message: any;
	_chatSubscription;
	messages: Observable<any[]>;
	messages1: any;

	constructor (public navCtrl: NavController, public navParams: NavParams, public db: AngularFireDatabase) {
		this.username = this.navParams.get('username');
		this._chatSubscription = this.db.list('/chats').valueChanges().subscribe((data) => {
			this.messages1 = data;
			console.log(data);
		});
	}

	sendMessage () {
		this.db
			.list('/chats')
			.push({
				username: this.username,
				message: this.message
			})
			.then(() => {
				// message is sent
			})
			.catch(() => {
				// some error. maybe firebase is unreachable
			});
		this.message = '';
	}

	ionViewDidLoad () {
		this.db.list('/chats').push({
			specialMessage: true,
			message: `${this.username} has joined the room`
		});
	}

	ionViewWillLeave () {
		this._chatSubscription.unsubscribe();
		this.db.list('/chats').push({
			specialMessage: true,
			message: `${this.username} has left the room`
		});
	}
}
