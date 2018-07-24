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

	  @ViewChild(Nav) nav: Nav;
	  rootpage: any =  TabsPage;
	  
    pages: Array<{title: string, component: any}>;

  
  constructor(public platform: Platform, public navCtrl: NavController, public navParams: NavParams) {
 	  console.log("in menu page constructro");
      this.pages = [
        { title: 'Profile', component: ProfilePage },
        { title: 'Feedetails', component: FeedetailsPage }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }
openPage(page: any) {
	    console.log("hell")
      this.navCtrl.setRoot(page.component); 
}

isActive(page : any)
{}

}
