import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';

/*
  Generated class for the AppServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AppServiceProvider {

  constructor(public http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

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
  getRemoteData()
  {
    //return this.http.get('assets/data/example_2.json').map(res =>res.json());.subscribe
    //(data => {console.log(data);});

    return this.http.get("https://jsonplaceholder.typicode.com/users").map(res =>res.json());//.subscribe
   // (data => {console.log(data);});
    
  }
}
