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

  assignedstop: any;
  image = "../assets/imgs/bus2.png";

  livelocation: any;
  markers=[];

  public mylat: any;
  public mylon: any;


  constructor(public modal: ModalController, public pusher: PusherServiceProvider, public locationService: LocationServiceProvider,
    public storage: Storage, public http: Http, public datepipe: DatePipe, public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public app: AppServiceProvider, public geolocation: Geolocation) {
  }

  ionViewWillEnter() {

  }
  ngOnInit() {
    this.showmap();
  }

  ionViewDidLoad() {
    this.getAssignedStop();
  }

  showmap() {

    this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 2000, maximumAge: 0 }).then((resp) => {
      this.mylat = resp.coords.latitude;
      this.mylon = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    const mymark = new google.maps.LatLng(this.mylat, this.mylon);
    this.addMarker(mymark, this.map);
    this.showMarkers();
    const location = new google.maps.LatLng(34.083656, 74.797371);
    let options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true,
      gestureHandling: 'cooperative',
      rotateControl: true,
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
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });
    this.markers.push(marker);
    //return new google.maps.Marker({ position, map })
  }

  getlocation() {
    this.bus = this.navParams.get('data');
    this.channel = this.pusher.init(this.bus + '-channel');
    this.channel.bind('location-update', (data) => {
      this.livelocation = data;
      const loc = new google.maps.LatLng(data.lat, data.lng);
      this.clearMarkers();
      this.addMarker(loc, this.map);
      this.showMarkers();
      this.app.showToast(JSON.stringify(data), 'top', 'success');
    });
  }
  showMarkers() {
    this.setMapOnAll(this.map);
  }
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  clearMarkers() {
    this.setMapOnAll(null);
    this.markers=[];
  }

  ionViewDidLeave() {
    //clearInterval(this.locationService.id);
    let bus_no = this.navParams.get('data');
    this.pusher.destroy(bus_no + '-channel');
  }

  getAssignedStop() {
    this.storage.get('user').then((user) => {
      this.locationService.getProfile(user)
        .subscribe(
          result => {
            this.assignedstop = result.data.stop;
            const loc = new google.maps.LatLng(this.assignedstop.lat, this.assignedstop.lng);
            var showMarkers = new google.maps.Marker({ position: loc, title: this.assignedstop.name, icon: this.image });
            showMarkers.setMap(this.map);
          },
          err => {

          },
          () => {

          }
        )
    })
  }

  focus(xyz) {
    if (xyz == 1) {

      this.map.setCenter({
        lat: this.livelocation.lat,
        lng: this.livelocation.lng
      });

    } else if (xyz == 2) {

      this.map.setCenter({
        lat: this.mylat,
        lng: this.mylon
      });

    } else {

      this.map.setCenter({
        lat: this.assignedstop.lat,
        lng: this.assignedstop.lng
      });
    }
  }
}