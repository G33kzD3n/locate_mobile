import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Http } from '@angular/http';
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { PopoverController } from 'ionic-angular';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { RequestOptions, Headers } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-passengers',
  templateUrl: 'passengers.html',
})
export class PassengersPage {
  data: any = [];
  passengers: any=[];
  constructor(public storage: Storage, public app: AppServiceProvider,
    public navCtrl: NavController, public navParams: NavParams,
    public http: Http, public popoverCtrl: PopoverController,
    public notificationSrv: NotificationServiceProvider,
    public locationService: LocationServiceProvider) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengersPage');
    this.getdata();
  }


  getdata() {
    this.storage.get('bus_no').then((bus_no) => {
      // let headers = new Headers({ 'Content-Type': 'application/json' });
      // let options = new RequestOptions({ headers: headers });
      this.http.get(this.app.getUrl() + '/buses/' + bus_no + '/passengers?groupby=stopnames')
        .map(res => res.json())
        .subscribe(

          result => {
            for (let i = 0; i < result.length; i++) {
              this.data[i] = result[i].stop;
            }
            for (let i = 0; i < result.length; i++) {
              this.passengers[i]=result[i].stop.passengers;
            }
            console.log(this.data);
            console.log(this.passengers);
            //this.passengers = result.passengers;
          },
          error => {
            error = (JSON.parse(error._body));
            if (error) {
              this.app.showToast("No data found in the database", 'top', 'error');
            }
          },
          () => {
            //this.app.removeLoader();
          });
    });
  }
  presentPopover(ev) {
    let modal = this.popoverCtrl.create(ModalPage);
    modal.present({
      ev: ev
    });
  }
}
