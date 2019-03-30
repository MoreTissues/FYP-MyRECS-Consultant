import { IonicPageModule } from 'ionic-angular';

import { NgModule } from '@angular/core';

import { MpEventPage } from './mp-event';

@NgModule({
  declarations: [
    MpEventPage,
  ],
  imports: [
    IonicPageModule.forChild(MpEventPage),
  ],
})
export class MpEventPageModule {}
