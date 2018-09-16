import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Geolocation } from "@ionic-native/geolocation";

declare var google: any;


@IonicPage()
@Component({
  selector: 'page-mybus',
  templateUrl: 'mybus.html',
})

export class MybusPage {

  @ViewChild('map') mapRef: ElementRef;


  map: any;
  lat: any;
  lon: any;
  i: any;
  mark: any;

  public points: any = [];

  public bus: any;
  public hideMe: boolean = false;
  public button: string = "See Route Plan";

   image = "/assets/imgs/icon.png";

  constructor(public http: Http, public geolocation: Geolocation, public app: AppServiceProvider, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.bus = "";
  }



  ionViewDidLoad() {
    this.gotomybus();
  }

  showmap() {
    const location = new google.maps.LatLng(34.129881, 74.836936);

    const options = {
      center: location,
      zoom: 13,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkers(this.points);
    this.app.removeLoader();
  }

  addMarkers(points: any) {
    console.log(points.length);

    for (let i = 0; i < points.length; i++) {
      var position = new google.maps.LatLng(this.points[i][1], this.points[i][2]);

      var showMarkers = new google.maps.Marker({ position: position, title: this.points[i][0], icon: this.image });
      showMarkers.setMap(this.map);

    }
  }

  showroute() {

    if (this.hideMe === false) {
      this.app.showLoader('Loading Route...');
      this.hideMe = true;
      this.button = "Hide";
      setTimeout(() => {
        this.showmap();
      }, 300);

    } else {

      this.hideMe = false;
      this.button = "Show Route Plan";

    }

  }

  gotomybus(): any {
    this.storage.get('bus_no').then((bus_no) => {
      bus_no = this.app.getToken(bus_no);
      this.app.showLoader("Loading...");
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.get(this.app.getUrl() + '/buses/' + bus_no, options)
        .map(res => res.json())
        .subscribe(

          result => {
            this.bus = result.bus;
            this.points = this.bus.stops;
            console.log(this.bus);
            console.log(this.points[0][2]);
          },
          error => {
            error = (JSON.parse(error._body));
            if (error) {
              this.app.showToast('error.error.error_message', 'top');
            }
            this.app.removeLoader();
          },
          () => {
            this.app.removeLoader();
          });
    });
  }


}
