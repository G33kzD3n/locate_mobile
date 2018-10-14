import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Http } from '@angular/http';
import { Geolocation } from "@ionic-native/geolocation";
import { CallNumber } from '@ionic-native/call-number';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { ModalPage } from '../modal/modal';
import { NotificationServiceProvider } from '../../providers/notification-service/notification-service';
import { PopoverController } from 'ionic-angular';
declare var google: any;


@IonicPage()
@Component({
  selector: 'page-mybus',
  templateUrl: 'mybus.html',
})

export class MybusPage {

  @ViewChild('map') mapRef: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;

  myStopIndex: number = 0;
  map: any;
  lat: any;
  lon: any;
  i: any;
  mark: any;

  public poly: any;
  public points: any = [];
  public places;
  public bus: any;
  public hideMe: boolean = false;
  public button: string = "See Route Plan";
  assignedstop: any;
  image = "assets/imgs/icon.png";
  image1 = "assets/imgs/bus2.png";
  waypts: any = [];

  constructor(public notificationSrv: NotificationServiceProvider, public locationService: LocationServiceProvider,
    public popoverCtrl: PopoverController,
    public http: Http, public geolocation: Geolocation,
    public app: AppServiceProvider, public storage: Storage,
    public navCtrl: NavController, public navParams: NavParams,
    public callNumber: CallNumber) {
    this.bus = "";
  }
  ionViewDidLoad() {
    this.gotomybus();
    this.getAssignedStop();
  }

  call(num) {
    this.callNumber.callNumber(num, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
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
      if (this.points[i][0] != this.assignedstop.lat && this.points[i][1] != this.assignedstop.lng) {
        var position = new google.maps.LatLng(this.points[i][0], this.points[i][1]);
        var showMarkers = new google.maps.Marker({ position: position, title: arr[i], icon: this.image });
        showMarkers.setMap(this.map);
      }
      else {
        const loc = new google.maps.LatLng(this.assignedstop.lat, this.assignedstop.lng);
        var showMarkers = new google.maps.Marker({ position: loc, title: this.assignedstop.name, icon: this.image1 });
        this.myStopIndex = i;
        showMarkers.setMap(this.map);
      }
    }
  }

  startNavigating() {
    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;
    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);
    console.log(this.points[this.myStopIndex - parseInt('2')]);
    console.log("***waypoints");

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
    }, (res, status) => {
      if (status == google.maps.DirectionsStatus.OK) {
        directionsDisplay.setDirections(res);
      } else {
        console.warn(status);
      }
    });
  }
  showroute() {
    if (!this.app.serverOffline) {
      this.app.showToast('Please try after sometime', 'top', 'error');
    }
    else {
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
  }


  gotomybus(): any {
    this.storage.get('bus_no').then((bus_no) => {
      this.app.showLoader("Loading...");
      this.locationService.getStops(bus_no)
        .subscribe(
          result => {
            this.bus = result.bus;
            this.places = this.bus.stops.names;
            this.points = this.bus.stops.latLngs;
            this.app.serverOffline=true;
          },
          error => {
            this.app.removeLoader();
            if (this.app.serverDown(error)) {
              this.app.showToast('Please try after sometime', 'top', 'error');
              this.app.serverOffline=false;
            } else {
              this.app.showToast("No data found in the database", 'top', 'error');
            }
          },
          () => {
            this.app.removeLoader();
          });
    });
  }
  getAssignedStop() {
    this.storage.get('user').then((user) => {
      this.locationService.getProfile(user)
        .subscribe(
          res => {
            this.assignedstop = res.data.stop;
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
  presentPopover(ev) {
    let modal = this.popoverCtrl.create(ModalPage);
    modal.present({
      ev: ev
    });
  }
}
