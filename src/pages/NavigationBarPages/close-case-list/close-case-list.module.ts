import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CloseCaseListPage } from './close-case-list';

@NgModule({
  declarations: [
    CloseCaseListPage,
  ],
  imports: [
    IonicPageModule.forChild(CloseCaseListPage),
  ],
})
export class CloseCaseListPageModule {}
