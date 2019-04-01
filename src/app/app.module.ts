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
import { RegisterPage } from '../pages/Registration/register/register';
import { LoginPage } from './../pages/login/login';
import { ProfilePage } from '../pages/Registration/profile/profile';
import { CaseListPage } from '../pages/NavigationBarPages/case-list/case-list';
import { ChattingPage } from '../pages/NavigationBarPages/Chat/chatting/chatting';
import { CloseCaseListPage } from '../pages/NavigationBarPages/close-case-list/close-case-list';
import { MpClinicalPage } from './../pages/MP-Create-Update-Cases/mp-clinical/mp-clinical';
import { MpSpeciesIdPage } from './../pages/MP-Create-Update-Cases/mp-species-id/mp-species-id';
import { MpHistoryPage } from './../pages/MP-Create-Update-Cases/mp-history/mp-history';
import { PatientDetailsPage } from './../pages/MP-Create-Update-Cases/mp-patient-details/patient-details';
import { MpEventPage } from '../pages/MP-Create-Update-Cases/mp-event/mp-event';
import { MpManagementPage } from '../pages/NavigationBarPages/mp-management/mp-management';
import { MpCreateManagementPage } from './../pages/MP-Create-Update-Cases/mp-create-management/mp-create-management';

@NgModule({
	declarations: [
		MyApp,
		RegisterPage,
		LoginPage,
		ProfilePage,
		CaseListPage,
		ChattingPage,
		CloseCaseListPage,
		MpClinicalPage,
		MpSpeciesIdPage,
		MpHistoryPage,
		PatientDetailsPage,
		MpEventPage,
		MpManagementPage,
		MpCreateManagementPage
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
		RegisterPage,
		LoginPage,
		ProfilePage,
		CaseListPage,
		ChattingPage,
		CloseCaseListPage,
		MpClinicalPage,
		MpSpeciesIdPage,
		MpHistoryPage,
		PatientDetailsPage,
		MpEventPage,
		MpManagementPage,
		MpCreateManagementPage
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
