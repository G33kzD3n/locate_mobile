import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class AppServiceProvider {
  private baseUrl: string = "http://localhost:8000/api/1.0";

  constructor(public http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

  }


  loader() {
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    setTimeout(() => {
      loading.dismiss();
    }, 100);
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
  getRemoteData() {
    //return this.http.get('assets/data/example_2.json').map(res =>res.json());.subscribe
    //(data => {console.log(data);});

    return this.http.get("https://jsonplaceholder.typicode.com/users").map(res => res.json());//.subscribe
    // (data => {console.log(data);});

  }

  getToken(token) {

    return token;
  }
}
