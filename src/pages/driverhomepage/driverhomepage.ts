import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Http } from '@angular/http';
import { MenuController } from 'ionic-angular';
import { Geolocation } from "@ionic-native/geolocation";
import { Storage } from '@ionic/storage';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
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
    public popoverCtrl: PopoverController,
    public notificationSrv: NotificationServiceProvider) {
  }
  ngOnInit() {
    this.locationService.id = setInterval(() => {
      this.storewhereabouts();
    }, 6000);
  }

  ionViewOnLoad() {
  }

  storewhereabouts() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }).
      then((resp) => {
        this.lat = resp.coords.latitude;
        this.lng = resp.coords.longitude;
        this.storage.get('bus_no').then((bus_no) => {

          let payload = {
            busno: bus_no,
            lat: this.lat,
            lng: this.lng,
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
                err = (JSON.parse(err._body));
                console.log("Database error");
              }
            );
        });

      }).catch((err) => {
        // this.app.removeLoader();
        console.log(err);
        // this.app.showToast("Error!!!", 'top', 'error');
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
            err = (JSON.parse(err._body));
            this.app.removeLoader();
            console.log("error in get location");
          }
        );
    });
  }
  ionViewDidLeave() {
    clearInterval(this.locationService.id);
  }
  presentPopover(ev) {
    let modal = this.popoverCtrl.create(ModalPage);
    modal.present({
      ev: ev
    });
  }
}