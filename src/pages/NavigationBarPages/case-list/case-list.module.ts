import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CaseListPage } from './case-list';

@NgModule({
  declarations: [
    CaseListPage,
  ],
  imports: [
    IonicPageModule.forChild(CaseListPage),
  ],
})
export class CaseListPageModule {}
