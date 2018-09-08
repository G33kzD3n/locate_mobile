import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from 'ionic-angular';
import 'rxjs/add/operator/map';



@Injectable()
export class AppServiceProvider {
 private baseUrl: string = "http://192.168.43.58:8000/api/1.0";
  //private baseUrl: string = "http://127.0.0.1:8000/api/1.0";
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


  getToken(token)
  {
    
    return token;
  }
 
  
}
