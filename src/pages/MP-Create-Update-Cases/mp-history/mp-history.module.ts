import { IonicPageModule } from 'ionic-angular';

import { NgModule } from '@angular/core';

import { MpHistoryPage } from './mp-history';

@NgModule({
  declarations: [
    MpHistoryPage,
  ],
  imports: [
    IonicPageModule.forChild(MpHistoryPage),
  ],
})
export class MpHistoryPageModule {}
