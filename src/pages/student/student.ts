import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
//import { MenuController } from 'ionic-angular';

//import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the StudentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {
	

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StudentPage');
  }

}
