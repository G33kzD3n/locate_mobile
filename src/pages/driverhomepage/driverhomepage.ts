import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Http } from '@angular/http';
import { MenuController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { Storage } from '@ionic/storage';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { Geofence } from '@ionic-native/geofence';
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { PopoverController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-driverhomepage',
  templateUrl: 'driverhomepage.html',
})
export class DriverhomepagePage {
  @ViewChild('map') mapRef: ElementRef;
  isOn: boolean = false;
  buttonColor: string;
  text: string = "Start Engine";
  map: any;
  lat: any;
  lng: any;
  id: any;
  myLocation: any;
  speed: any;

  onClickIgnition() {
    if (this.isOn == false) {
      console.log("Engine started");
      this.buttonColor = "#008000";
      this.isOn = true;
      this.text = "Turn Off Engine"
    } else {
      console.log("Engine Turned Off");
      this.buttonColor = "#0000cd";
      this.isOn = false;
      this.text = "Start Engine"
    }
  }

  constructor(
    public http: Http, public storage: Storage,
    public navCtrl: NavController, public menu: MenuController,
    public navParams: NavParams, public app: AppServiceProvider,
    public geolocation: Geolocation, public locationService: LocationServiceProvider,
    private geofence: Geofence, public popoverCtrl: PopoverController,
    public notificationSrv: NotificationServiceProvider) {
    geofence.initialize().then(
      () => console.log('Geofence Plugin Ready'),
      (err) => console.log(err)
    )
  }
  ngOnInit() {
    this.locationService.id = setInterval(() => {
      this.storewhereabouts();
    }, 4000);

    this.addGeofence();
  }

  ionViewOnLoad() {
  }

  storewhereabouts() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 3000, maximumAge: 0 }).
      then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        this.speed = resp.coords.speed;
        this.storage.get('bus_no').then((bus_no) => {
          let payload = {
            busno: bus_no,
            lat: this.lat,
            lng: this.lng,
            speed: this.speed,
            time: this.app.calDate()
          };
          console.log(payload.time);
          this.locationService.storeLocation(payload)
            .subscribe(
              res => {
                this.getLocation();
              },
              err => {
                this.app.removeLoader();
                if (this.app.serverDown(err)) {
                  this.app.showToast('Please try after sometime', 'top', 'error');
                }
              }
            );
        });

      }).catch((err) => {
        // this.app.removeLoader();
        console.log(err);
        //this.app.showToast("Error!!!", 'top', 'error');
      });
  }

  getLocation() {
    this.storage.get('bus_no').then((bus_no) => {
      let payload = {
        busno: bus_no,
      };
      this.locationService.getLocation(payload.busno)
        .subscribe(
          res => {
            let data: any;
            data = res;
            this.myLocation = data.bus;
          },
          err => {
            this.app.removeLoader();
            if (this.app.serverDown(err)) {
              this.app.showToast('Please try after sometime', 'top', 'error');
            }
          }
        );
    });
  }
  ionViewDidLeave() {
    clearInterval(this.locationService.id);
  }

  private addGeofence() {
    //options describing geofence
    let fence = {
      id: '69ca1b88-6fbe-4e80-a4d4-ff4d3748acdb', //any unique ID
      latitude: 34.144135,  //center of geofence radius
      longitude: 74.801942,
      radius: 1000, //radius to edge of geofence in meters
      transitionType: 3, //see 'Transition Types' below
      notification: { //notification settings
        id: 1, //any unique ID
        title: 'Warning', //notification title
        text: 'Bus Is About To Reach Your Stop', //notification body
        openAppOnClick: true //open app when notification is tapped
      }
    }
    this.geofence.addOrUpdate(fence).then(
      () => console.log('Geofence added'),
      (err) => console.log('Geofence failed to add')
    );
  }
  presentPopover(ev) {
    let modal = this.popoverCtrl.create(ModalPage);
    modal.present({
      ev: ev
    });
  }
}