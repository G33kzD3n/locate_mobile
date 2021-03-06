import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Http } from '@angular/http';
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { PopoverController } from 'ionic-angular';
import { LocationServiceProvider } from '../../providers/location-service/location-service';

@IonicPage()
@Component({
  selector: 'page-passengers',
  templateUrl: 'passengers.html',
})
export class PassengersPage {
  data: any = [];
  passengers: any = [];
  constructor(protected storage: Storage, protected app: AppServiceProvider,
    protected navCtrl: NavController, protected navParams: NavParams,
    protected http: Http, protected popoverCtrl: PopoverController,
    protected notificationSrv: NotificationServiceProvider,
    protected locationService: LocationServiceProvider) {

  }
  ionViewDidLoad() {
    this.getdata();
  }

  getdata() {
    this.storage.get('bus_no').then((bus_no) => {
      this.app.showLoader("Loading passengers of this bus");
      this.http.get(this.app.getUrl() + '/buses/' + bus_no + '/passengers?groupby=stopnames')
        .map(res => res.json())
        .subscribe(
          result => {
            for (let i = 0; i < result.length; i++) {
              this.data[i] = result[i].stop;
            }
            for (let i = 0; i < result.length; i++) {
              this.passengers[i] = result[i].stop.passengers;
            }
          },
          error => {
            this.app.removeLoader();
            if (this.app.serverDown(error)) {
              this.app.showToast('Please try after sometime', 'top', 'error');
            }
            else {
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
