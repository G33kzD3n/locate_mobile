import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { LocationServiceProvider } from '../../providers/location-service/location-service';

import { ProfilePage } from '../profile/profile';
import { StudentPage } from '../student/student';
import { LoginPage } from '../login/login';
import { LocationPage } from '../location/location';
import { CalenderPage } from '../calender/calender';
import { MybusPage } from '../mybus/mybus';
import { PassengersPage } from '../passengers/passengers';
import { BreakdownPage } from '../breakdown/breakdown';
import { DriverprofilePage } from '../driverprofile/driverprofile';
import { DriverhomepagePage } from '../driverhomepage/driverhomepage';


@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage {

  public rootpage: any;
  @ViewChild(Nav) nav: Nav;
  public level: any;
  public pages: Array<{ title: string, component: any, icon: any, index: any }>;
  public user = "";
  public user1: any;
  activepage: any;


  constructor(public location:LocationServiceProvider ,public platform: Platform, public alert: AlertController, public app: AppServiceProvider, public navCtrl: NavController, public http: Http, public navParams: NavParams, public storage: Storage) {

  }
  isActive() { }
  openPage(p: any) {
    this.nav.setRoot(p.component);
    this.activepage = p;
  }
  openProfile() {
    this.storage.get('level').then((data) => {
      if (data === 0) {
        this.nav.setRoot(ProfilePage);
      }
      else if(data===2){
        this.nav.setRoot(ProfilePage);
      }
      else
      {
        this.nav.setRoot(DriverprofilePage);
      }
    })
  }

  showMenu() {

    this.storage.get('level').then((data) => {
      if (data === 0) {
        this.rootpage = StudentPage;
        this.pages = [

          { title: 'Home', component: StudentPage, icon: 'home', index: 0 },
          { title: 'My Bus', component: MybusPage, icon: 'bus', index: 0 },
          { title: 'Buses', component: LocationPage, icon: 'bus', index: 0 },
          { title: 'University Calender', component: CalenderPage, icon: 'calendar', index: 0 },
        ];
        this.activepage = this.pages[0];
      }
      if (data === 1) {
        this.rootpage = DriverhomepagePage;
        this.pages = [
          { title: 'Home', component: DriverhomepagePage, icon: 'home', index: 0 },
          { title: 'Passengers', component: PassengersPage, icon: 'people', index: 0 },
          { title: 'Breakdown', component: BreakdownPage, icon: 'hand', index: 0 },
          { title: 'University Calender', component: CalenderPage, icon: 'calendar', index: 0 },
        ];
        this.activepage = this.pages[0];
      }
      if (data === 2) {
        this.rootpage = StudentPage;
        this.pages = [

          { title: 'Home', component: StudentPage, icon: 'home', index: 0 },
          { title: 'Passengers', component: PassengersPage, icon: 'bus', index: 0 },
          { title: 'Breakdown', component: LocationPage, icon: 'bus', index: 0 },
          { title: 'University Calender', component: CalenderPage, icon: 'calendar', index: 0 },
        ];
        this.activepage = this.pages[0];
      }
    })
  }
  ionViewWillEnter() {
    this.showMenu();
  }
  ionViewDidEnter() {
    this.storage.get('name').then((user) => {
      this.user1 = this.app.getToken(user);
    });
    
  }


  checkActive(p) {
    return p == this.activepage;
  }
  logOut() {
    clearInterval(this.location.id);
    this.Confirm();
  }
  Confirm() {
    let alert = this.alert.create({
      title: 'Confirm LogOut',
      message: 'Are you sure! you want to logOut?',
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.storage.clear();
            this.navCtrl.setRoot(LoginPage);
            this.app.showToast('Logout successfull!', 'top', "success");
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    alert.present();
  }
}

