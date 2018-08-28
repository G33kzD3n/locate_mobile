import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform} from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RequestOptions, Headers, Http } from '@angular/http';

import { TabsPage } from '../tabs/tabs';
import { ProfilePage} from '../profile/profile';
import { FeedetailsPage} from '../feedetails/feedetails';
import { StudentPage} from '../student/student';
import { LoginPage } from '../login/login';
import { getScrollData } from 'ionic-angular/umd/components/input/input';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {
  public rootpage: any = TabsPage;
  @ViewChild(Nav) nav: Nav;
  public level: any;
  public pages: Array<{ title: string, component: any, icon: any, index:any}>;
  public user: any;
    
  
  constructor(public platform: Platform, public navCtrl: NavController,public http: Http, public navParams: NavParams, public storage: Storage) {
    
}
openPage(p:any)
{
  this.navCtrl.push(p.component);
} 
openProfile()
{
     this.navCtrl.push(ProfilePage);
}

showMenu(){
  this.storage.get('level') .then((data) =>{
 if ( data === 0 )
   {
    this.pages = [
      
      { title: 'Home', component: StudentPage, icon:'home', index: 0 },
      { title: 'Locate Bus', component: ProfilePage, icon:'bus', index: 0 },
      { title: 'Feedetails', component: FeedetailsPage, icon:'cash', index: 0 },
      { title: 'University Calender', component: FeedetailsPage, icon:'calendar', index: 0 },
    ];
  }
  if ( data === 1 )
  {
    this.pages = [
      { title: 'Home', component: StudentPage, icon:'home', index: 0 },
      { title: 'Passengers', component: ProfilePage, icon:'people', index: 0 },
      { title: 'Breakdown', component: FeedetailsPage, icon:'hand', index: 0 },
      { title: 'University Calender', component: FeedetailsPage, icon:'calendar', index: 0 },
    ];
  }
})
}
ionViewWillEnter(){
  this.showMenu();
}
ionViewDidEnter()
  {
    
    this.user= this.navParams.get('user');
    console.log(this.user);
    this.http.get('http://192.168.43.58:9000/api/1.0/users/' +  this.user)
          .map(res => res.json())
          .subscribe(
  
            result => {
              this.user=result;
              console.log(this.user);
              console.log(this.user[0].username);        

            },
            error => {
              this.user=(JSON.parse(error._body));

            },
            () => {
            //this.app.showToast('logged in', 'top');
           // this.navCtrl.setRoot(MenuPage);
          });
  }


  isActive(p:any)
  {

  }
logOut(){
  this.navCtrl.setRoot(LoginPage);
}
}