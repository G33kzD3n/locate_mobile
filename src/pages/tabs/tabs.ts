import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Tabs} from 'ionic-angular';

import { StudentPage } from '../student/student';
import { LocationPage } from '../location/location';
import { RoutePage } from '../route/route';

@IonicPage()
@Component({
	selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {


  tab1Root:any = StudentPage; 
  tab2Root:any = LocationPage; 
  tab3Root:any = RoutePage;  


  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	
  }
}