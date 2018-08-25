import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform} from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { ProfilePage} from '../profile/profile';
import { FeedetailsPage} from '../feedetails/feedetails';
import { StudentPage} from '../student/student';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  public rootpage: any = TabsPage;
  @ViewChild(Nav) nav: Nav;
  public pages: Array<{ title: string, component: any, icon: any, index:any}>;
    
  
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
    this.pages = [
      { title: 'Trackbus', component: StudentPage, icon:'locate', index: 0 },
      { title: 'Profile', component: ProfilePage, icon:'person', index: 0 },
      { title: 'Feedetails', component: FeedetailsPage, icon:'money', index: 0 },
      { title: 'Buses', component: FeedetailsPage, icon:'bus', index: 0 }
    ];
}
openPage(p:any)
{
  this.navCtrl.push(p.component);
} 
  isActive(p:any)
  {

  }
}