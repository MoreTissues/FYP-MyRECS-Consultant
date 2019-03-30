import { IonicPageModule } from 'ionic-angular';

import { NgModule } from '@angular/core';

import { ChattingPage } from './chatting';

@NgModule({
  declarations: [
    ChattingPage,
  ],
  imports: [
    IonicPageModule.forChild(ChattingPage),
  ],
})
export class ChattingPageModule {}
