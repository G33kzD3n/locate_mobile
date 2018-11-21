import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, ViewController } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { PusherServiceProvider } from '../../providers/pusher-service/pusher-service';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { BreakdowncordPage } from '../breakdowncord/breakdowncord';




@IonicPage()
@Component({
  selector: 'page-modal',
  templateUrl: 'modal.html',
})
export class ModalPage {
  notifications: any = [];
  constructor(protected pusher: PusherServiceProvider,
    protected app: AppServiceProvider, protected viewCtrl: ViewController,
    protected modal: ModalController, protected navCtrl: NavController,
    protected navParams: NavParams,
    protected notificationSrv: NotificationServiceProvider) {
    this.notifications = this.notificationSrv.getPushNotifications();

  }
  
  openbreak() {
    this.navCtrl.push(BreakdowncordPage);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  ionViewDidLoad() {
  }
  
  clear() {
    this.notificationSrv.ncounter = 0;
    this.notifications = [];
    this.notificationSrv.notifications = [];
  }

}
