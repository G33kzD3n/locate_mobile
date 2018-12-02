import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { RequestOptions, Headers, Http } from '@angular/http'
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { PopoverController } from 'ionic-angular';
import { LivelocationPage } from '../livelocation/livelocation';
import { LocationServiceProvider } from '../../providers/location-service/location-service';

@IonicPage()
@Component({
  selector: 'page-location',
  templateUrl: 'location.html',
})
export class LocationPage {

  public stops: any;
  public buses: any;
  public bus: any;
  public On: Boolean = false;
  public hideMe: number;
  public button: string = "Show Route";
  image = "/assets/imgs/icon.png";
  mybus: any;



  constructor(protected http: Http,
    protected app: AppServiceProvider, protected storage: Storage,
    protected navCtrl: NavController, protected navParams: NavParams,
    protected popoverCtrl: PopoverController, protected locationService: LocationServiceProvider,
    protected notificationSrv: NotificationServiceProvider) {
    this.buses = "";
    //this.stops="";
  }

  ionViewDidLoad() {
    this.locatebuses();
  }

  livetrack(bus_no) {
    this.navCtrl.push(LivelocationPage, {
      data: bus_no
    });
  }


  showroute(i: number) {
    this.hideMe = i;
    if (this.On) {
      this.On = false;
      this.button = "Show Route";
    } else {
      this.button = "Hide";
      this.On = true;
    }
  }
  locatebuses() {
    this.storage.get('bus_no').then((bus_no) => {
      bus_no = this.app.getToken(bus_no);
      this.mybus = bus_no;
      //code from 90 to 92 is used for showing only the non logged in buses
      //else it will show all the buses.
      this.app.showLoader("Loading");
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      this.http.get(this.app.getUrl() + '/buses', options)
        .map(res => res.json())
        .subscribe(

          result => {
            this.buses = result.buses;
            this.stops = result.buses[0].stops.names.split(';');
          },
          error => {
            this.app.removeLoader();
            if (this.app.serverDown(error)) {
              this.app.showToast('Please try after sometime', 'top', 'error');
            } else {
              this.app.showToast('No data found in the database', 'top', 'error');
            }
          },
          () => {
            this.app.removeLoader();
          });
    });
  }
  presentPopover(ev) {
    let modal = this.popoverCtrl.create(ModalPage);
    modal.present({
      ev: ev
    });
  }
}