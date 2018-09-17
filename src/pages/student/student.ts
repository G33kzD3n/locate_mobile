import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common'
import { Geolocation } from "@ionic-native/geolocation";
import { LocationServiceProvider } from '../../providers/location-service/location-service';
declare var google: any;

@IonicPage()
@Component({

  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  lat: any;
  long: any;
  bus: any;

  constructor(public locationService: LocationServiceProvider,
    public storage: Storage, public http: Http, public datepipe: DatePipe, public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public app: AppServiceProvider, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.app.showLoader("Loading...");
    this.showmap();
  }


  showmap() {
    const location = new google.maps.LatLng(34.083656, 74.797371);
    let options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };
    //create map
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.app.removeLoader();
    setInterval(() => {
      this.getlocation();
    }, 15000);
  }

  addMarker(position, map) {
    return new google.maps.Marker({ position, map });
  }

  getlocation() {
    this.storage.get('bus_no').then((bus_no) => {
      bus_no = this.app.getToken(bus_no);
      this.locationService.getLocation(bus_no)
        .subscribe(
          res => {
            this.bus = res;
            const loc = new google.maps.LatLng(this.bus.bus.lat, this.bus.bus.lng);
            this.addMarker(loc, this.map);
          },
          err => {
            //err = (JSON.parse(err._body));
            if (err.status = 429) {
              console.log(err);
              this.app.showToast("Something went wrong...Kindly reload or try after Sometime", "top", 'error')
            }
          },
          () => {
            //this.app.removeLoader();
          }
        );
    });
  }
}