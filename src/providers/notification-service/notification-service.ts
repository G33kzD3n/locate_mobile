import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PopoverController } from 'ionic-angular';
import { ModalPage } from '../../pages/modal/modal';

@Injectable()
export class NotificationServiceProvider {
  loc: string;
  breakdown: string;
  notifications: any = [];
  ncounter:number = 0;
  breakdownmsg:any;

  constructor(public http: HttpClient, public popoverCtrl: PopoverController) {
    console.log('Hello NotificationServiceProvider Provider');
  }
  pushNotification(data: any) {
    this.notifications.unshift(data);
  }
  getPushNotifications() {
    return this.notifications;
  }
  
}
