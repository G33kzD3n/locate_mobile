import { Component, } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import 'rxjs/add/operator/map';
import { Http } from "@angular/http";
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LocationServiceProvider } from '../../providers/location-service/location-service';



@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',

})
export class RoutePage {
  public points: any = [];
  public places;
  public bus: any;
  public names:any=[];

  constructor(public http: Http, public locationService: LocationServiceProvider,
    public navCtrl: NavController, public navParams: NavParams,
    public app: AppServiceProvider, public notificationSrv: NotificationServiceProvider,
    public popoverCtrl: PopoverController, public storage: Storage) {

  }

  ionViewDidLoad() {
    this.myRoute();
  }

  presentPopover(ev) {
    let modal = this.popoverCtrl.create(ModalPage);
    modal.present({
      ev: ev
    });
  }
  myRoute(): any {
    this.storage.get('bus_no').then((bus_no) => {
      this.app.showLoader("Loading...");
      this.locationService.getStops(bus_no)
        .subscribe(
          result => {
            this.bus = result.bus;
            this.places = this.bus.stops.names;
            this.points = this.bus.stops.latLngs;
            for(let i=0;i<1;i++)
            {
              this.names=this.bus.stops.names.split(';');
            }
            console.log(this.names);
          },
          error => {
            error = (JSON.parse(error._body));
            if (error) {
              this.app.removeLoader();
              this.app.showToast("No data found in the database", 'top', 'error');
            }
          },
          () => {
            this.app.removeLoader();
          });
    });
  }
}