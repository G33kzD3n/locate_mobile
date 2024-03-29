import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RequestOptions, Headers, Http } from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-driverprofile',
  templateUrl: 'driverprofile.html',
})
export class DriverprofilePage {
  public user1: any;
  public title = "Profile";
  public id: any;

  constructor(protected popoverCtrl: PopoverController,
    protected notificationSrv: NotificationServiceProvider,
    protected navCtrl: NavController, protected storage: Storage,
    protected app: AppServiceProvider, protected http: Http,
    protected navParams: NavParams) {
    this.user1 = "";
    this.id = "";
  }

  ionViewDidLoad() {
    this.app.showLoader("Loading your profile...")
    this.showprofile();
  }

  showprofile() {
    this.storage.get('user').then((user) => {
      user = this.app.getToken(user);
      this.id = user;
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.get(this.app.getUrl() + '/users/' + user, options)
        .map(res => res.json())
        .subscribe(
          result => {
            this.user1 = result.data;
          },
          error => {
            this.app.removeLoader();
            if (this.app.serverDown(error)) {
              this.app.showToast('Please try after sometime', 'top', 'error');
            }else{
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