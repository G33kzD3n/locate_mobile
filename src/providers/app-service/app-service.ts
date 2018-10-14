import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { DatePipe } from '@angular/common';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';
import { OpenNativeSettings } from '@ionic-native/open-native-settings';


@Injectable()
export class AppServiceProvider {
   private baseUrl: string = "https://convoyfleet.herokuapp.com/public/api/1.0";
  //private baseUrl: string = "http://192.168.43.58:9000/api/1.0";
 // private baseUrl: string = "http://192.168.43.220:8000/api/1.0";

  public loader: any;
  public style: any;
  myDate: any = new Date().toLocaleString();
  internetstatus: boolean;
  userlevel;
  

  constructor(public platform :Platform,public settings: OpenNativeSettings, public datepipe: DatePipe, public plat: Platform, public alert: AlertController, public network: Network, public http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.loader = this.loadingCtrl.create({
      content: ''
    });
    this.checknetwork();
  }
  showLoader(message: string) {
    this.loader = this.loadingCtrl.create({
      content: message
    });
    this.loader.present();
  }

  removeLoader(timmer: number = 0) {
    setTimeout(() => {
      this.loader.dismiss();
    }, timmer);

  }
  checknetwork() {
    this.network.onConnect().subscribe(() => {
      this.internetstatus = true;
    });

    this.network.onDisconnect().subscribe(() => {
      this.Confirm();
      this.internetstatus = false;
    });
  }
    
  showToast(data: string, position: string, style: string) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: position,
      cssClass: style
    });
    setTimeout(() => {
      toast.present();
    });

  }
  getUrl() {
    return this.baseUrl;
  }
  calDate() {
    this.myDate = new Date();
    let latest_date: String = this.datepipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss');
    return latest_date;
  }

  getToken(token) {

    return token;
  }
  Confirm() {
    let alert = this.alert.create({
      title: 'No Internet',
      message: 'This app requires an Active Internet Connection in order to function properly',
      buttons: [
        {
          text: 'Open Settings',
          handler: () => {
            this.openinternetsettings();
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
           // this.exitapp();
          }
        }
      ]
    });
    alert.present();
  }
  openinternetsettings() {
    this.settings.open('network').then(value => {
      console.log('settings opened');
    }).catch(err =>
      console.log(err));
  }
  exitapp(){
    this.platform.exitApp();
  }
}