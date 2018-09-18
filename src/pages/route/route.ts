import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import 'rxjs/add/operator/map';
import { Http } from "@angular/http";



@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
  //template: `<page-login></page-login>`,

})
export class RoutePage {


  constructor(public http: Http,
    public navCtrl: NavController, public navParams: NavParams, public app: AppServiceProvider) {

  }

  ionViewDidLoad() {

  }
}