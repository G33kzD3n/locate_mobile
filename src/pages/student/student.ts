import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common'
import { Geolocation } from "@ionic-native/geolocation";
import { PusherServiceProvider } from '../../providers/pusher-service/pusher-service';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';

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
  lng: any;
  bus: any;
  assignedstop: any;
  livelocation: any;
  image = "assets/imgs/bus2.png";
  markers = [];
  location: any;
  output: any;

  channel: any;
  public mylat: any;
  public mylon: any;
  public distance: any;

  constructor(public modal: ModalController, public pusher: PusherServiceProvider,
    public locationService: LocationServiceProvider,
    public storage: Storage, public http: Http, public datepipe: DatePipe,
    public navCtrl: NavController, public menu: MenuController,
    public navParams: NavParams, public app: AppServiceProvider, public geolocation: Geolocation,
    public popoverCtrl: PopoverController,
    public notificationSrv: NotificationServiceProvider) {
  }

  ngOnInit() {
    this.eta();
    this.pusher.breakdown = this.pusher.init('8839-channel');
    this.showmap();
    if (this.app.userlevel == 0) {
      this.getbreakdownupdate();
    }
    if (this.app.userlevel == 2) {
      this.getbreakdown();
    }
  }

  getbreakdown() {
    this.pusher.breakdown.bind('breakdown-info-created', (data) => {
      this.notificationSrv.pushNotification({
        level: 2,
        msg: data
      });
      this.notificationSrv.ncounter++;
      //stores data later to b used in breakdowncord.ts
      //to show type of breakdown to cordinator
      this.notificationSrv.breakdownmsg = data;
    });
  }

  getbreakdownupdate() {
    this.pusher.breakdown.bind('breakdown-info-updated', (data) => {
      this.notificationSrv.pushNotification({
        level: 0,
        msg: data
      });
      this.notificationSrv.ncounter++;
    });
  }

  ionViewDidLoad() {
    this.getAssignedStop();
  }

  addMarker(position, map) {
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });
    this.markers.push(marker);
  }

  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }

  clearMarkers() {
    this.setMapOnAll(null);
    this.markers = [];
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
    var location = new google.maps.LatLng(34.083656, 74.797371);
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

  showMarkers() {
    this.setMapOnAll(this.map);
  }

  getlocation() {
    this.pusher.breakdown.bind('location-update', (data) => {
      this.bus = data;
      this.livelocation = data;
      this.clearMarkers();
      const loc = new google.maps.LatLng(data.lat, data.lng);
      this.addMarker(loc, this.map);
      this.showMarkers();
      //this.app.showToast(JSON.stringify(data), 'top', 'success');
    });
  }

  ionViewDidLeave() {
    this.storage.get('bus_no').then((bus_no) => {
      this.pusher.breakdown.unbind('location-update');
    });
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
  ////////////////partially applied ETA//////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////
  eta() {
    var origin1 = new google.maps.LatLng(34.083724, 74.797235);
    var destinationA = new google.maps.LatLng(34.076633, 74.829661);
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: [destinationA],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, callback);

    function callback(response, status) {
      if (status == 'OK') {
        var origins = response.originAddresses;
        var destinations = response.destinationAddresses;
        this.output = document.getElementById('abc');
        for (var i = 0; i < origins.length; i++) {
          var results = response.rows[i].elements;
          for (var j = 0; j < results.length; j++) {
            var element = results[j];
            this.distance = element.distance.text;
            var duration = element.duration.text;
            var from = origins[i];
            var to = destinations[j];
          }
        }
      }
    }
  }
  //////////////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////
  focus(xyz) {
    if (xyz == 1) {
      try {
        this.map.setCenter({
          lat: this.livelocation.lat,
          lng: this.livelocation.lng
        });
      } catch (error) {
        this.app.showToast('No Live Bus Found', 'top', 'error');
      }
    } else if (xyz == 2) {
      try {
        this.map.setCenter({
          lat: this.mylat,
          lng: this.mylon
        });
      } catch (error) {
        this.app.showToast('Unable To Find Your Location. Enable GPS', 'top', 'error');
      }
    } else {
      this.map.setCenter({
        lat: this.assignedstop.lat,
        lng: this.assignedstop.lng
      });
    }
  }
  presentPopover(ev) {
    let modal = this.popoverCtrl.create(ModalPage);
    modal.present({
      ev: ev
    });
  }
}