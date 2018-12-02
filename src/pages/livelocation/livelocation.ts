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
  location: any;
  bus: any;
  mylocImage = "assets/imgs/myloc.png";
  busmarker = "assets/imgs/busmarker.png";
  assignedstop: any;
  image = "assets/imgs/bus2.png";

  livelocation: any;
  markers=[];

  public mylat: any;
  public mylon: any;


  constructor(protected modal: ModalController, protected pusher: PusherServiceProvider, protected locationService: LocationServiceProvider,
    protected storage: Storage, protected http: Http, protected datepipe: DatePipe, protected navCtrl: NavController, protected menu: MenuController, protected navParams: NavParams, protected app: AppServiceProvider, protected geolocation: Geolocation) {
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
    this.getlocation();
  }

  addMarker(position, map) {
    var marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: this.busmarker
    });
    this.markers.push(marker);
  }

  getlocation() {
    this.bus = this.navParams.get('data');
    this.location = this.pusher.init(this.bus + '-channel');
    this.location.bind('location-update', (data) => {
      this.livelocation = data;
      const loc = new google.maps.LatLng(data.lat, data.lng);
      this.clearMarkers();
      this.addMarker(loc, this.map);
      this.showMarkers();
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
            if (this.app.serverDown(err)) {
              this.app.showToast('Please try after sometime', 'top', 'error');
            }
          },
          () => {

          }
        )
    })
  }

  focus(xyz) {
    if (xyz == 1) {
      try {
        this.map.setCenter({
          lat: this.livelocation.lat,
          lng: this.livelocation.lng
        });
        this.app.showToast('Bus Located' ,'top', '');
      } catch (error) {
        this.app.showToast('No Live Bus Not Found', 'top', 'error');
      }
    } else if (xyz == 2) {
      try {
        this.map.setCenter({
          lat: this.mylat,
          lng: this.mylon
        });

        const loc1 = new google.maps.LatLng(this.mylat, this.mylon);
          var showMark = new google.maps.Marker({ position: loc1 , icon: this.mylocImage});
          showMark.setMap(this.map);
        this.app.showToast('Current Location' ,'top', '');
      } catch (error) {
        this.app.showToast('Unable To Find Your Location. Enable GPS', 'top', 'error');
      }

    } else {
      try {
        this.map.setCenter({
          lat: this.assignedstop.lat,
          lng: this.assignedstop.lng
        });
        this.app.showToast('Your Registered Stop' ,'top', '');
      } catch (error) {
        this.app.showToast('Could Not Found Your Stop' ,'top', '');
      }
    }
  }
}