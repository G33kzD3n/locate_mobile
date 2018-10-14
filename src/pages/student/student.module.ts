import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StudentPage } from './student';
import { ProgressBarComponent} from '../../components/progress-bar/progress-bar'

@NgModule({
  declarations: [
    StudentPage,
    ProgressBarComponent
  ],
  imports: [
    IonicPageModule.forChild(StudentPage),
  ],
})
export class StudentPageModule {}
