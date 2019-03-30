import { IonicPageModule } from 'ionic-angular';

import { NgModule } from '@angular/core';

import { NewCaseListPage } from './new-case-list';

@NgModule({
  declarations: [
    NewCaseListPage,
  ],
  imports: [
    IonicPageModule.forChild(NewCaseListPage),
  ],
})
export class NewCaseListPageModule {}
