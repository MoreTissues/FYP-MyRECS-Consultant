import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';

//Angular Fire Modules
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';

// Import Firebase configurations
import * as firebase from 'firebase/app';
import { FIREBASE_CONFIG } from './app.firebase.config';
firebase.initializeApp(FIREBASE_CONFIG);

//OneSignal Notifications
import { OneSignal } from '@ionic-native/onesignal';

//Others
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { Camera } from '@ionic-native/camera';
import { File } from '@ionic-native/file';
import { FileTransfer } from '@ionic-native/file-transfer';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AuthProvider } from '../providers/auth/auth';
import { MyApp } from './app.component';

//Pages
import { RegisterPage } from '../pages/register/register';
import { HomePage } from './../pages/home/home';

@NgModule({
	declarations: [
		MyApp,
		HomePage,
		RegisterPage
	],
	imports: [
		BrowserModule,
		HttpModule,
		IonicModule.forRoot(MyApp),
		AngularFireModule.initializeApp(FIREBASE_CONFIG),
		AngularFireAuthModule,
		AngularFireDatabaseModule,
		HttpClientModule
	],
	bootstrap: [
		IonicApp
	],
	entryComponents: [
		MyApp,
		HomePage,
		RegisterPage
	],
	providers: [
		StatusBar,
		SplashScreen,
		Camera,
		FileTransfer,
		File,
		{ provide: ErrorHandler, useClass: IonicErrorHandler },
		AuthProvider,
		OneSignal
	]
})
export class AppModule {}
