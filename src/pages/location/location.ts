import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { RequestOptions, Headers, Http } from '@angular/http'


@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {
  public buses: any;

  constructor(public http: Http, public app: AppServiceProvider, public storage: Storage,public navCtrl: NavController, public navParams: NavParams) {
    this.buses="";
  }

  ionViewDidLoad() {
    this.locatebuses();
  }
  locatebuses() {
    
    this.storage.get('bus_no').then((bus_no) => {
      bus_no = this.app.getToken(bus_no);

      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.get(this.app.getUrl() + '/buses/', options)
        .map(res => res.json())
        .subscribe(

          result => {
            this.buses = result.buses;
            for(let i=0 ; i<3 ; i++){
            console.log(this.buses);
            console.log(this.buses[i].stops[i][0]);

           // console.log(this.data.stops[i]);
            }
          },
          error => {
            error = (JSON.parse(error._body));
            if (error) {
              this.app.showToast('error.error.error_message', 'top');
            }
          },
          () => {

          });
    });
  }
}
