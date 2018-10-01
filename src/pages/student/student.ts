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
  image = "/assets/imgs/bus2.png";
 
  channel: any;
  

  constructor(public modal: ModalController, public pusher: PusherServiceProvider,
    public locationService: LocationServiceProvider,
    public storage: Storage, public http: Http, public datepipe: DatePipe,
    public navCtrl: NavController, public menu: MenuController,
    public navParams: NavParams, public app: AppServiceProvider, public geolocation: Geolocation) {
  
  }
  focusOnStop() {
    console.log("stop");
  }
  focusOnCurrent() {
    console.log("current");
  }
  focusOnBus() {
    console.log("Bus focus");
  }
  openmodal()
  {
    let notice= this.modal.create(ModalPage)
    notice.present();
  }
  
  ngOnInit() {
    this.showmap();
  }

  ionViewDidLoad() {
    this.getAssignedStop();
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
    this.storage.get('bus_no').then((bus_no) => {
      bus_no = this.app.getToken(bus_no);
      this.channel = this.pusher.init(bus_no + '-channel');
      this.channel.bind('location-update', (data) => {
        this.bus = data;
        const loc = new google.maps.LatLng(data.lat, data.lng);
        this.addMarker(loc, this.map);
        this.app.showToast(JSON.stringify(data), 'top', 'success');
      });
      // this.locationService.getLocation(bus_no)
      //   .subscribe(
      //     res => {
      //       this.bus = res.bus;
      //       //this.distanceCal(this.assignedstop.lat, this.assignedstop.lng, this.bus.lat, this.bus.lng);
      //       const loc = new google.maps.LatLng(this.bus.lat, this.bus.lng);
      //       this.addMarker(loc, this.map);

      //     },
      //     err => {
      //       //err = (JSON.parse(err._body));
      //       if (err.status = 429) {
      //         console.log(err);
      //         this.app.showToast("Something went wrong...Kindly reload or try after Sometime", "top", 'error')
      //       }
      //     },
      //     () => {
      //       //this.app.removeLoader();
      //     }
      //   );
    });
  }

  ionViewDidLeave() {
    //clearInterval(this.locationService.id);
    this.storage.get('bus_no').then((bus_no) => {
      this.pusher.destroy(bus_no + '-channel');
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
}