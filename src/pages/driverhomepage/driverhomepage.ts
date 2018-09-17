import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Http } from '@angular/http';
import { MenuController } from 'ionic-angular';
import { DatePipe } from '@angular/common'
import { Geolocation } from "@ionic-native/geolocation";
import { Storage } from '@ionic/storage';
import { LocationServiceProvider } from '../../providers/location-service/location-service';

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
  myDate: any = new Date().toLocaleString();
  map: any;
  lat: any;
  long: any;
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
    public datepipe: DatePipe,
    public navCtrl: NavController, public menu: MenuController,
    public navParams: NavParams, public app: AppServiceProvider,
    public geolocation: Geolocation, public locationService: LocationServiceProvider) {
  }
  ionViewDidLoad() {
    //this.app.showLoader("Loading... please wait");
    this.id = setInterval(() => {
      this.storewhereabouts();
    }, 3000);
  }

  storewhereabouts() {
    this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }).
      then((resp) => {
        this.lat = resp.coords.latitude;
        this.long = resp.coords.longitude;
        this.storage.get('bus_no').then((bus_no) => {

          let payload = {
            busno: bus_no,
            lat: this.lat,
            long: this.long,
            time: this.calDate()
          };
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
        //this.app.showToast("Error! reload the app",'top','error');
      });
  }
  calDate() {
    this.myDate = new Date();
    let latest_date: String = this.datepipe.transform(this.myDate, 'yyyy-MM-dd hh:mm:ss');
    return latest_date;
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
            console.log("");
          }
        );
    });
  }
}