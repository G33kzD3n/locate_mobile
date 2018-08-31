import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengersPage } from './passengers';

@NgModule({
  declarations: [
    PassengersPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengersPage),
  ],
})
export class PassengersPageModule {}
