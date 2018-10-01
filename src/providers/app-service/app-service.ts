import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { DatePipe } from '@angular/common'
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';



@Injectable()
export class AppServiceProvider {
  // private baseUrl: string = "https://laravel-5j3c.frb.io/api/1.0";
  private baseUrl: string = "http://192.168.43.220:8000/api/1.0";
  public loader: any;
  networkConn: any;
  public style: any;
  myDate: any = new Date().toLocaleString();
  constructor(public datepipe: DatePipe, public plat: Platform, public alert: AlertController, public network: Network, public http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    this.loader = this.loadingCtrl.create({
      content: ''
    });

  }
  conn() {
    this.plat.ready().then(() => {
      this.network.onDisconnect().subscribe(() => {
        this.networkConn = false;
        console.log('hell');
      });
    });
    this.network.onConnect().subscribe(() => {
      console.log("network");
      this.networkConn = true;
    });
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

}