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


@IonicPage()
@Component({
  selector: 'page-breakdowncord',
  templateUrl: 'breakdowncord.html',
})
export class BreakdowncordPage {
  loginForm: FormGroup;
  constructor(public pusher: PusherServiceProvider, public network: Network, public navCtrl: NavController, private app: AppServiceProvider, public http: Http, public storage: Storage) {
  }

  ionViewDidLoad() {

  }
  ngOnInit() {
    //this.getbreakdown();
    this.loginForm = new FormGroup({
      'message': new FormControl()
    });
  }
  getbreakdown() {
    //this.pusher.breakdown = this.pusher.init(bus_no + '-channel');
    this.pusher.breakdown.bind('breakdown-info-created', (data) => {
      console.log(data);
      this.pusher.breakdownmsg = data;
    });
  }
  ionViewDidLeave() {

  }
  sendbreakdownwithmsg() {
    this.app.showLoader("Sending message to all students of the bus");
    let payload = {
      message: this.loginForm.controls['message'].value,
      time: this.app.calDate()
    };
    let record_id = this.pusher.breakdownmsg.record_id;
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
            this.pusher.message=payload.message;
            console.log(this.pusher.message);
            this.app.showToast('Message sent', 'top', 'success');
          });
    });
  }
}
