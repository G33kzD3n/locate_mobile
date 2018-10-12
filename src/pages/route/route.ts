import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import 'rxjs/add/operator/map';
import { Http } from "@angular/http";
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { PopoverController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
declare var google: any;


@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',

})
export class RoutePage {
  @ViewChild('map') mapRef: ElementRef;
  

  public points: any = [];
  public places;
  public bus: any;
  public names: any = [];
  public hideMe: boolean = false;

  
  map: any;
  
  image = "assets/imgs/icon.png";
  
  

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
            for (let i = 0; i < 1; i++) {
              this.names = this.bus.stops.names.split(';');
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

  showmap() {
    const location = new google.maps.LatLng(34.129881, 74.836936);

    const options = {
      center: location,
      zoom: 17,
      disableDefaultUI: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP

    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.addMarkers(this.points);
    this.app.removeLoader();
  }

  addMarkers(points: any) {
    var arr = this.places.split(';');
    for (let i = 0; i < points.length; i++) {
      var position = new google.maps.LatLng(this.points[i][0], this.points[i][1]);
      var showMarkers = new google.maps.Marker({ position: position, title: arr[i], icon: this.image });
      showMarkers.setMap(this.map);
    }

  }
  showroute() {

    if (this.hideMe === false) {
      this.app.showLoader('Loading Route...');
      this.hideMe = true;
      setTimeout(() => {
        this.showmap();
        this.startNavigating();
      }, 300);

    } else {

      this.hideMe = false;
    }

  }
  startNavigating() {


    let directionsService = new google.maps.DirectionsService;
    directionsService.route({
      origin: '34.1284, 74.8365',

      waypoints: [{

        location: this.points[2][0] + "," + this.points[2][1],
        stopover: true
      }, {
        location: this.points[4][0] + "," + this.points[4][1],
        stopover: true
      },
      {
        location: this.points[6][0] + "," + this.points[6][1],
        stopover: true
      },
      {
        location: this.points[8][0] + "," + this.points[8][1],
        stopover: true
      },
      {
        location: this.points[10][0] + "," + this.points[10][1],
        stopover: true
      }
      ],

      destination: '34.2323, 74.4163',

      provideRouteAlternatives: true,

      travelMode: google.maps.TravelMode['DRIVING']
    });

  }



}