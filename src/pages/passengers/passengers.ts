import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-passengers',
  templateUrl: 'passengers.html',
})
export class PassengersPage {

  passengers: any;
  constructor(public storage: Storage, public app:AppServiceProvider ,public navCtrl: NavController, public navParams: NavParams, public http: Http) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengersPage');
    this.getdata();
  }


  getdata() {
    this.storage.get('bus_no').then((bus_no) => {
    bus_no = this.app.getToken(bus_no);

    this.http.get(this.app.getUrl() + '/buses/' + bus_no + '/passengers')
      .map(res => res.json())
      .subscribe(

        result => {
          this.passengers = result.passengers;
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

}
