import { ChattingPage } from './../pages/NavigationBarPages/Chat/chatting/chatting';
import { CaseListPage } from './../pages/NavigationBarPages/case-list/case-list';
import { Nav, Platform } from 'ionic-angular';

import { Component, ViewChild } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { LoginPage } from '../pages/login/login';
import { AuthProvider } from '../providers/auth/auth';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
import { isCordovaAvailable } from '../common/is-cordova-available';
import { oneSignalAppId, sender_id } from '../config';
@Component({
	templateUrl: 'app.html'
})
export class MyApp {
	@ViewChild(Nav) nav: Nav;

	rootPage: any = CaseListPage;

	pages: Array<{ title: string; component: any }>;

	constructor (
		public platform: Platform,
		public statusBar: StatusBar,
		public splashScreen: SplashScreen,
		private _AUTH: AuthProvider,
		private oneSignal: OneSignal
	) {
		this.initializeApp();

		//Populate pages for application
		this.pages = [
			{ title: 'Cases List', component: CaseListPage },
			{ title: 'Closed Cases List', component: CaseListPage },
			{ title: 'Report and Statistics', component: CaseListPage },
			{ title: 'Snake Gallery', component: CaseListPage },
			{ title: 'Chat', component: ChattingPage },
			{ title: 'Logout', component: LoginPage }
		];
	}

	initializeApp () {
		this.platform.ready().then(() => {
			// Okay, so the platform is ready and our plugins are available.
			// Here you can do any higher level native things you might need.
			this.statusBar.backgroundColorByHexString('#696969');
			this.splashScreen.hide();
			if (isCordovaAvailable()) {
				this.oneSignal.startInit(oneSignalAppId, sender_id);
				this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification);
				this.oneSignal.handleNotificationReceived().subscribe((data) => this.onPushReceived(data.payload));
				this.oneSignal
					.handleNotificationOpened()
					.subscribe((data) => this.onPushOpened(data.notification.payload));
				this.oneSignal.endInit();
			}
		});
	}

	private onPushReceived (payload: OSNotificationPayload) {
		alert('Push recevied:' + payload.body);
	}

	private onPushOpened (payload: OSNotificationPayload) {
		alert('Push opened: ' + payload.body);
	}

	openPage (page: any): void {
		// Ensure we can log out of Firebase and reset the root page
		if (page == 'Logout') {
			this._AUTH
				.logOut()
				.then((data: any) => {
					this.nav.setRoot(page.component);
				})
				.catch((error: any) => {
					console.dir(error);
				});
		} else {
			// Reset the content nav to have just this page
			// we wouldn't want the back button to show in this scenario
			this.nav.setRoot(page.component);
		}
	}
}
