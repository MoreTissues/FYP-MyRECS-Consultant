import { IonicPageModule } from 'ionic-angular';

import { NgModule } from '@angular/core';

import { MpClinicalPage } from './mp-clinical';

@NgModule({
  declarations: [
    MpClinicalPage,
  ],
  imports: [
    IonicPageModule.forChild(MpClinicalPage),
  ],
})
export class MpClinicalPageModule {}
