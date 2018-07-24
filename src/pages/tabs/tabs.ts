import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';

import { StudentPage } from '../student/student';
import { LocationPage } from '../location/location';
import { RoutePage } from '../route/route';

@IonicPage()
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {


  tab1Root = StudentPage; 
  tab2Root = LocationPage; 
  tab3Root = RoutePage;  


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	console.log("in tabs file");
  }
}