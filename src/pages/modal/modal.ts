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
  constructor(public pusher: PusherServiceProvider,
    public app: AppServiceProvider, public viewCtrl: ViewController,
    public modal: ModalController, public navCtrl: NavController,
    public navParams: NavParams,
    public notificationSrv: NotificationServiceProvider) {
    this.notifications = this.notificationSrv.getPushNotifications();

  }
  openbreak() {
    //this.navCtrl.setRoot(BreakdowncordPage);
    
    this.navCtrl.setRoot(BreakdowncordPage);
  }

  ionViewDidLoad() {
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }
  clear() {
    this.notificationSrv.ncounter = 0;
    this.notifications = [];
    this.notificationSrv.notifications = [];
  }

}
