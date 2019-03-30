import { IonicPageModule } from 'ionic-angular';

import { NgModule } from '@angular/core';

import { MpSpeciesIdPage } from './mp-species-id';

@NgModule({
  declarations: [
    MpSpeciesIdPage,
  ],
  imports: [
    IonicPageModule.forChild(MpSpeciesIdPage),
  ],
})
export class MpSpeciesIdPageModule {}
