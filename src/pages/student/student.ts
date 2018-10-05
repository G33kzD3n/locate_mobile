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
    public popoverCtrl: PopoverController) {

  }
  
  ngOnInit() {
    this.eta();
    this.showmap();
    if (this.app.userlevel == 2) {
      this.getbreakdown();
    }
    if (this.app.userlevel == 0) {
      this.getbreakdownupdate();
    }
    console.log("user level=" + this.app.userlevel);

  }
  getbreakdown() {
    this.pusher.breakdown.bind('breakdown-info-created', (data) => {
      console.log(data);
      this.pusher.breakdownmsg = data;
    });
  }
  getbreakdownupdate() {
    this.pusher.breakdown.bind('breakdown-info-updated', (data) => {
      console.log(data);
      this.pusher.message = data;
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
    //return new google.maps.Marker({ position, map })
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
    //this.location = this.pusher.init(bus_no + '-channel');
    this.pusher.breakdown.bind('location-update', (data) => {
      console.log(data);
      this.bus = data;
      this.livelocation = data;
      this.clearMarkers();

      const loc = new google.maps.LatLng(data.lat, data.lng);
      this.addMarker(loc, this.map);
      this.showMarkers();
      this.app.showToast(JSON.stringify(data), 'top', 'success');
      this.pusher.message.push(data.lat, data.lng);
      this.app.ncounter++;
      console.log(this.pusher.message);
    });
  }

  ionViewDidLeave() {
    //clearInterval(this.locationService.id);
    this.storage.get('bus_no').then((bus_no) => {
      //this.pusher.destroy(bus_no + '-channel');
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
            console.log("aa" + results[j])
            this.distance = element.distance.text;
            console.log(this.distance)
            var duration = element.duration.text;
            console.log(duration)
            var from = origins[i];
            console.log(from )
            var to = destinations[j];
            console.log(to )
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

        this.app.showToast('No Live Bus Not Found', 'top', '');
      }


    } else if (xyz == 2) {
      try {
        this.map.setCenter({
          lat: this.mylat,
          lng: this.mylon
        });
      } catch (error) {
        this.app.showToast('Unable To Find Your Location. Enable GPS', 'top', '');
      }



    } else {

      this.map.setCenter({
        lat: this.assignedstop.lat,
        lng: this.assignedstop.lng
      });
    }
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create(ModalPage);
    popover.present({
      ev: ev
    });
 
   }
}