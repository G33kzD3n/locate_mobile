import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedetailsPage } from './feedetails';

@NgModule({
  declarations: [
    FeedetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(FeedetailsPage),
  ],
})
export class FeedetailsPageModule {}
