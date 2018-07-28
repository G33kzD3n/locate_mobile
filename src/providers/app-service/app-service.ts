import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
/*
  Generated class for the AppServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppServiceProvider {

  constructor(public http: HttpClient, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {
    console.log('Hello AppServiceProvider Provider');
  }


loader()
{
  let loading = this.loadingCtrl.create({
    content: 'Please wait...'
  });
  
  loading.present();

  setTimeout(() => {
    loading.dismiss();
  }, 100);       
}

showToast(data: string, position: string,delay:number=0) {
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
}
