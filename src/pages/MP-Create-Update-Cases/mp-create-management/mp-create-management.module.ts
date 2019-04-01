import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MpCreateManagementPage } from './mp-create-management';

@NgModule({
  declarations: [
    MpCreateManagementPage,
  ],
  imports: [
    IonicPageModule.forChild(MpCreateManagementPage),
  ],
})
export class MpCreateManagementPageModule {}
