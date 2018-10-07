import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { PusherServiceProvider } from '../../providers/pusher-service/pusher-service';

import "rxjs/add/operator/map";
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { PopoverController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-breakdowncord',
  templateUrl: 'breakdowncord.html',
})
export class BreakdowncordPage {
  loginForm: FormGroup;
  message: any;
  constructor(public notificationSrv: NotificationServiceProvider, public pusher: PusherServiceProvider,
    public network: Network, public navCtrl: NavController,
    private app: AppServiceProvider, public http: Http,
    public storage: Storage, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {

  }
  ngOnInit() {
    this.getbreakdown();
    this.loginForm = new FormGroup({
      'message': new FormControl()
    });
  }
  getbreakdown() {
    //this.pusher.breakdown = this.pusher.init(bus_no + '-channel');
    this.message = this.notificationSrv.breakdownmsg;
  }
  ionViewDidLeave() {

  }
  sendbreakdownwithmsg() {
    this.app.showLoader("Sending message to all students of the bus");
    let payload = {
      message: this.loginForm.controls['message'].value,
      time: this.app.calDate()
    };
    let record_id = this.notificationSrv.breakdownmsg.record_id;
    console.log(record_id);
    this.storage.get('bus_no').then((bus_no) => {
      console.log(payload);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.put(this.app.getUrl() + '/buses/' + bus_no + '/breakdowns/' + record_id, payload, options)
        .map(res => res.json())
        .subscribe(

          result => {

          },
          error => {
            this.app.removeLoader();
            this.app.showToast('Something went wrong', 'top', 'success');
          },

          () => {
            this.app.removeLoader();
            this.app.showToast('Message sent', 'top', 'success');
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
