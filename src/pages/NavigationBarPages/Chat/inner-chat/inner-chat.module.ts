import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InnerChatPage } from './inner-chat';

@NgModule({
  declarations: [
    InnerChatPage,
  ],
  imports: [
    IonicPageModule.forChild(InnerChatPage),
  ],
})
export class InnerChatPageModule {}
