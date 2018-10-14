import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestOptions, Headers, Http } from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Storage } from '@ionic/storage';
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { PopoverController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-breakdown',
  templateUrl: 'breakdown.html',
})
export class BreakdownPage {

  constructor(public storage: Storage, private app: AppServiceProvider,
    public http: Http, public navCtrl: NavController,
    public navParams: NavParams, public popoverCtrl: PopoverController,
    public notificationSrv: NotificationServiceProvider) {
  }

  ionViewDidLoad() {
  }
  message: string;
  sendBreakdown(data: { name: string }) {
    this.app.showLoader('Sending Breakdown Message. Please wait...');
    this.message = data.name;
    this.storage.get('bus_no').then((bus_no) => {
      let payload = {
        type: this.message,
        time: this.app.calDate()
      };
      console.log(payload);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.post(this.app.getUrl() + '/buses/' + bus_no + '/breakdown', payload, options)
        .map(res => res.json())
        .subscribe(
          result => {
          },
          error => {
            this.app.removeLoader();
            if (this.app.serverDown(error)) {
              this.app.showToast('Please try after sometime', 'top', 'error');
            }
            else {
              this.app.showToast("Breakdown Message wasnt sent", 'top', 'error');
            }
          },
          () => {
            this.app.removeLoader();
            this.app.showToast("Breakdown Message sent", 'top', 'success');
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
