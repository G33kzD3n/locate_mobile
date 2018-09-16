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
  public On :Boolean= false;
  public hideMe: number;
  public button: string = "Show Route";
  image = "/assets/imgs/icon.png";



  constructor(public http: Http,
    public app: AppServiceProvider, public storage: Storage,
    public navCtrl: NavController, public navParams: NavParams) {
    this.buses = "";
  }

  ionViewDidLoad() {
    this.locatebuses();


  }



  showroute(i:number) {
    this.hideMe=i;
    if(this.On){
      this.On = false;
      this.button ="Show Route";
    }else{
      this.button ="Hide";
      this.On =true;
    }
  }
  locatebuses() {

    this.storage.get('bus_no').then((bus_no) => {
      bus_no = this.app.getToken(bus_no);
      this.app.showLoader("Loading");
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.get(this.app.getUrl() + '/buses', options)
        .map(res => res.json())
        .subscribe(

          result => {
            this.buses = result.buses;
          },
          error => {
            error = (JSON.parse(error._body));
            if (error) {
              this.app.showToast('error.error.error_message', 'top');
            }
          },
          () => {
            this.app.removeLoader();
          });
    });
  }
}
