import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { PopoverController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-calender',
  templateUrl: 'calender.html',
})
export class CalenderPage {

  constructor(protected navCtrl: NavController, protected navParams: NavParams,
    protected popoverCtrl: PopoverController,
    protected notificationSrv: NotificationServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CalenderPage');
  }
  presentPopover(ev) {
    let modal = this.popoverCtrl.create(ModalPage);
    modal.present({
      ev: ev
    });
  }

}
