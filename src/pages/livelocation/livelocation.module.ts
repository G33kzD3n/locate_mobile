import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LivelocationPage } from './livelocation';

@NgModule({
  declarations: [
    LivelocationPage,
  ],
  imports: [
    IonicPageModule.forChild(LivelocationPage),
  ],
})
export class LivelocationPageModule { }
