import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { RequestOptions, Headers, Http } from '@angular/http'

import { LivelocationPage } from '../livelocation/livelocation';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  public stops: any;
  public buses: any;
  public bus: any;
  public On: Boolean = false;
  public hideMe: number;
  public button: string = "Show Route";
  image = "/assets/imgs/icon.png";
  mybus: any;



  constructor(public http: Http,
    public app: AppServiceProvider, public storage: Storage,
    public navCtrl: NavController, public navParams: NavParams) {
    this.buses = "";
    //this.stops="";
  }

  ionViewDidLoad() {
    this.locatebuses();
  }

  livetrack(bus_no) {
    //console.log(bus_no);
    this.navCtrl.push(LivelocationPage, {
      data : bus_no
    });
  }


  showroute(i: number) {
    this.hideMe = i;
    if (this.On) {
      this.On = false;
      this.button = "Show Route";
    } else {
      this.button = "Hide";
      this.On = true;
    }
  }
  locatebuses() {

    this.storage.get('bus_no').then((bus_no) => {
      bus_no = this.app.getToken(bus_no);
      this.mybus = bus_no;
      this.app.showLoader("Loading");
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.get(this.app.getUrl() + '/buses', options)
        .map(res => res.json())
        .subscribe(

          result => {
            this.buses = result.buses;
            console.log(this.buses);
            this.stops = result.buses[0].stops.names.split(';');
            console.log(this.stops);
          },
          error => {
            error = (JSON.parse(error._body));
            if (error) {
              this.app.removeLoader();
              this.app.showToast('No data found in the database', 'top', 'error');
            }
          },
          () => {
            this.app.removeLoader();
          });
    });
  }
}
