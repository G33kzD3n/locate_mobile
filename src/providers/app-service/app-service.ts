import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network';
import { Platform } from 'ionic-angular';
import { ToastController, LoadingController, AlertController } from 'ionic-angular';
import 'rxjs/add/operator/map';



@Injectable()
export class AppServiceProvider {
  private baseUrl: string = "http://192.168.43.220:8000/api/1.0";

  public loader: any;
  networkConn: any;

  constructor(public plat: Platform, public alert: AlertController, public network: Network, public http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
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
      // setTimeout(() => {
      //   if (this.network.type === 'wifi') {
      //     console.log('wifi');
      //   }
      // }, 5);
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

  showToast(data: string, position: string, delay: number = 0) {
    let toast = this.toastCtrl.create({
      message: data,
      duration: 3000,
      position: position,
      cssClass: 'mytoast'
    });
    setTimeout(() => {
      toast.present();
    }, delay);

  }
  getUrl() {
    return this.baseUrl;
  }


  getToken(token) {

    return token;
  }

}