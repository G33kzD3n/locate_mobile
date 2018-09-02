import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, Platform, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { ProfilePage } from '../profile/profile';
import { FeedetailsPage } from '../feedetails/feedetails';
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
  @ViewChild(Nav) nav: Nav;
  public level: any;
  public pages: Array<{ title: string, component: any, icon: any, index: any }>;
  public user = "";
  public username: any;
  activepage: any;


  constructor(public platform: Platform, public app: AppServiceProvider, public navCtrl: NavController, public http: Http, public navParams: NavParams, public storage: Storage, public alert: AlertController) {

  }

  openPage(p: any) {
    this.nav.setRoot(p.component);
    this.activepage = p;
  }
  openProfile() {
    this.nav.setRoot(ProfilePage, {
      user: this.navParams.get('user'),
      token: this.navParams.get('token')
    });

  }

  showMenu() {
    this.storage.get('level').then((data) => {
      if (data === 0) {
        this.pages = [

          { title: 'Home', component: StudentPage, icon: 'home', index: 0 },
          { title: 'Locate Bus', component: LocationPage, icon: 'bus', index: 0 },
          { title: 'Feedetails', component: FeedetailsPage, icon: 'cash', index: 0 },
          { title: 'University Calender', component: CalenderPage, icon: 'calendar', index: 0 },
        ];
        this.activepage = this.pages[0];
      }
      if (data === 1) {
        this.pages = [
          { title: 'Home', component: StudentPage, icon: 'home', index: 0 },
          { title: 'Passengers', component: PassengersPage, icon: 'people', index: 0 },
          { title: 'Breakdown', component: BreakdownPage, icon: 'hand', index: 0 },
          { title: 'University Calender', component: CalenderPage, icon: 'calendar', index: 0 },
        ];
        this.activepage = this.pages[0];
      }
    })
  }
  ionViewWillEnter() {
    console.log(this.navParams.get('user'));
    this.showMenu();
    this.nav.setRoot(StudentPage, {
      user: this.navParams.get('user'),
      token: this.navParams.get('token')
    });
  }
  ionViewDidEnter() {
    this.username = this.navParams.get('user');
  }


  checkActive(p) {
    return p == this.activepage;
  }
  logOut() {
    this.storage.clear();
    this.navCtrl.setRoot(LoginPage);
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
            this.app.showToast('Logout successfull!', 'top');
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