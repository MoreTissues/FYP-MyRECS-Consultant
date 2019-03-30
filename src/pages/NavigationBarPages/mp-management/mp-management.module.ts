import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MpManagementPage } from './mp-management';

@NgModule({
  declarations: [
    MpManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(MpManagementPage),
  ],
})
export class MpManagementPageModule {}
