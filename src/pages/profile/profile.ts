import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Nav, PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RequestOptions, Headers, Http } from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild(Nav) nav: Nav;
  public user1: any;
  public data: any;
  public stopid: any;
  title: string = "Profile";
  public roll:any;


  constructor(public notificationSrv: NotificationServiceProvider,public popoverCtrl: PopoverController,public locationService: LocationServiceProvider, public navCtrl: NavController, public storage: Storage, public app: AppServiceProvider, public http: Http, public navParams: NavParams) {

    this.user1 = "";
    this.data = "";
    this.roll="";
    }


  ionViewDidEnter() {
    this.app.showLoader("Loading your Profile...");
    this.openuser();
    this.openfee();
  }
  openuser() {
    this.storage.get('user').then((user) => {
      user = this.app.getToken(user);
      this.roll=user;
      this.locationService.getProfile(user)
        .subscribe(
          result => {
            this.user1 = result.data;
            this.stopid = this.user1.stop.name;
            console.log(this.stopid);
                },
          error => {
            error = (JSON.parse(error._body));
            if (error) {
              this.app.removeLoader();
              this.app.showToast("No data found in the database", 'top', 'error');
            }
          },
          () => {

          });
    });
  }
  openfee() {
    this.storage.get('user').then((user) => {
      user = this.app.getToken(user);


      let headers = new Headers({ 'Content-Type': 'application/json' });
      // headers.append('Authorization', 'Bearer ' + userToken);
      let options = new RequestOptions({ headers: headers });
      //console.log(user);
      // console.log(userToken);
      this.http.get(this.app.getUrl() + '/users/' + user + '/fees/unpaid', options)
        .map(res => res.json())
        .subscribe(

          result => {
            this.data = result.data;
          },
          error => {
            error = (JSON.parse(error._body));
            if (error) {
              this.app.removeLoader();
              this.app.showToast("No data found in the database", 'top', 'error');
            }
          },
          () => {
            this.app.removeLoader();
          });
    });
  }
  presentPopover(ev) {
    let modal = this.popoverCtrl.create(ModalPage);
    modal.present({
      ev: ev
    });
  }
}
