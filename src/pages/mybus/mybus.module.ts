import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MybusPage } from './mybus';

@NgModule({
  declarations: [
    MybusPage,
  ],
  imports: [
    IonicPageModule.forChild(MybusPage),
  ],
})
export class MybusPageModule {}
