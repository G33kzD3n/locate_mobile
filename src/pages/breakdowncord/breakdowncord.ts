import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Network } from '@ionic-native/network';
import { PusherServiceProvider } from '../../providers/pusher-service/pusher-service';
import "rxjs/add/operator/map";
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { PopoverController } from 'ionic-angular';
import {StudentPage} from '../student/student'


@IonicPage()
@Component({
  selector: 'page-breakdowncord',
  templateUrl: 'breakdowncord.html',
})
export class BreakdowncordPage {
  loginForm: FormGroup;
  message: any;
  record_id: any;
  record: boolean = false;

  constructor(public notificationSrv: NotificationServiceProvider, public pusher: PusherServiceProvider,
    public network: Network, public navCtrl: NavController,
    private app: AppServiceProvider, public http: Http,
    public storage: Storage, public popoverCtrl: PopoverController) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.message = this.notificationSrv.breakdownmsg;
    console.log(this.message);
    if (this.message !== undefined) {
      this.record = true;
    }
    this.loginForm = new FormGroup({
      'message': new FormControl('', Validators.compose([
        Validators.required]))
    });
  }

  ionViewDidLeave() {
  }

  sendbreakdownwithmsg() {
    if (this.record) {
      for (let i = 0; i < this.notificationSrv.notifications.length; i++) {
        if (this.message.time == this.notificationSrv.notifications[i].msg.time) {
          this.notificationSrv.notifications.splice([i], 1);
        }
      }
      this.app.showLoader("Sending message to all students of the bus");
      let payload = {
        message: this.loginForm.controls['message'].value,
        time: this.app.calDate()
      };
      this.record_id = this.notificationSrv.breakdownmsg.record_id;
      this.storage.get('bus_no').then((bus_no) => {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        this.http.put(this.app.getUrl() + '/buses/' + bus_no + '/breakdowns/' + this.record_id, payload, options)
          .map(res => res.json())
          .subscribe(

            result => {

            },
            error => {
              this.app.removeLoader();
              if (error.status==404)
              {
                this.app.showToast('No breakdown Message from Driver','top','error');
              }
              if (this.app.serverDown(error)) {
                this.app.showToast('Please try after sometime', 'top', 'error');
              } 
            },
            () => {
              this.app.removeLoader();
              this.app.showToast('Message sent', 'top', 'success');
              this.notificationSrv.breakdownmsg = "";
              this.notificationSrv.ncounter--;
              this.message = "";
              this.loginForm.reset();
              setTimeout(() => {
                this.navCtrl.setRoot(StudentPage);
              }, 800);
            });
      });
    }
    else {
      this.app.showToast('No breakdown Message from Driver', 'top', 'error');
    }
  }
  
  presentPopover(ev) {
    let modal = this.popoverCtrl.create(ModalPage);
    modal.present({
      ev: ev
    });
  }
}
