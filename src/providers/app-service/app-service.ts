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
  private baseUrl: string = "http://192.168.43.58:9000/api/1.0";
  public loader:any ;

  constructor(public http: Http, public loadingCtrl: LoadingController, public toastCtrl: ToastController) {

    this.loader = this.loadingCtrl.create({
      content: ''
    });
  }


showLoader(message:string)
{
   this.loader = this.loadingCtrl.create({
    content: message
  });
  this.loader.present();         
}

removeLoader(timmer:number=0){
  setTimeout(() => {   
    this.loader.dismiss();
  }, timmer);

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
getUrl() {
  return this.baseUrl;
}
  getRemoteData()
  {
    //return this.http.get('assets/data/example_2.json').map(res =>res.json());.subscribe
    //(data => {console.log(data);});

    return this.http.get("https://jsonplaceholder.typicode.com/users").map(res =>res.json());//.subscribe
   // (data => {console.log(data);});
    
  }

  getToken(token)
  {
    
    return token;
  }
  
}
