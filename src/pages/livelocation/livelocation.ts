import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common'
import { Geolocation } from "@ionic-native/geolocation";
import { PusherServiceProvider } from '../../providers/pusher-service/pusher-service';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
declare var google: any;

@IonicPage()
@Component({
  selector: 'page-livelocation',
  templateUrl: 'livelocation.html',
})
export class LivelocationPage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  channel: any;
  bus: any;

  constructor(public modal: ModalController, public pusher: PusherServiceProvider, public locationService: LocationServiceProvider,
    public storage: Storage, public http: Http, public datepipe: DatePipe, public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public app: AppServiceProvider, public geolocation: Geolocation) {
  }

  ionViewWillEnter() {

  }
  ngOnInit() {
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
    // this.locationService.id = setInterval(() => {
    this.getlocation();
    // }, 7000);
  }

  addMarker(position, map) {
    return new google.maps.Marker({ position, map });
  }

  getlocation() {
    this.bus = this.navParams.get('data');
    this.channel = this.pusher.init(this.bus+'-channel');
    this.channel.bind('location-update', (data) => {
      const loc = new google.maps.LatLng(data.lat, data.lng);
      this.addMarker(loc, this.map);
      this.app.showToast(JSON.stringify(data), 'top', 'success');
    });
  }
  ionViewDidLeave() {
    //clearInterval(this.locationService.id);
    let bus_no = this.navParams.get('data');
    this.pusher.destroy(bus_no + '-channel');
  }
}