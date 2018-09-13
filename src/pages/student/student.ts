import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { MenuController } from 'ionic-angular';
import { DatePipe } from '@angular/common'
import { Geolocation } from "@ionic-native/geolocation";
declare var google: any;

@IonicPage()
@Component({

  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  // loc: any;
  lat: any;
  long: any;
  myDate: any = new Date().toISOString();

  constructor(public datepipe: DatePipe, public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public app: AppServiceProvider, public geolocation: Geolocation) {
  }

  ionViewDidLoad() {
    this.myDate = new Date();
    let latest_date = this.datepipe.transform(this.myDate, 'yyyy-MM-dd');
    console.log(latest_date);
    this.showmap();
  }


  showmap() {

    this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 2000, maximumAge: 0 }).
      then((resp) => {
        //your position.
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
        const location = new google.maps.LatLng(this.lat, this.long);
        let options = {
          center: location,
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
        };
        //create map
        this.map = new google.maps.Map(this.mapRef.nativeElement, options);
        //add marker at that location.
        this.addMarker(location, this.map);


      }).catch((err) => {
        console.log(err);

      });
  }
  addMarker(position, map) {

    return new google.maps.Marker({ position, map });
  }
}