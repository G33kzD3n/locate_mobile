import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DrawerPage } from './drawer';

@NgModule({
  declarations: [
    DrawerPage,
  ],
  imports: [
    IonicPageModule.forChild(DrawerPage),
  ],
})
export class DrawerPageModule {}
