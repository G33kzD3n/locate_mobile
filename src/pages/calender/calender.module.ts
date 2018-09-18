import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CalenderPage } from './calender';

@NgModule({
  declarations: [
    CalenderPage,
  ],
  imports: [
    IonicPageModule.forChild(CalenderPage),
  ],
})
export class CalenderPageModule {}
