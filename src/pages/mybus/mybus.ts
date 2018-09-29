import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { RequestOptions, Headers, Http } from '@angular/http';
import { Geolocation } from "@ionic-native/geolocation";
import { CallNumber } from '@ionic-native/call-number';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
declare var google: any;


@IonicPage()
@Component({
  selector: 'page-mybus',
  templateUrl: 'mybus.html',
})

export class MybusPage {

  @ViewChild('map') mapRef: ElementRef;
  @ViewChild('directionsPanel') directionsPanel: ElementRef;


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
  image = '../assets/imgs/icon.png';
  image1 = '../assets/imgs/bus11.ico';
  waypts: ["this.assignedstop.lat, this.assignedstop.lng"];

  constructor(public locationService: LocationServiceProvider, public http: Http, public geolocation: Geolocation,
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
    console.log(num);
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
        showMarkers.setMap(this.map);
      }
    }

  }


  startNavigating() {

    let directionsService = new google.maps.DirectionsService;
    let directionsDisplay = new google.maps.DirectionsRenderer;

    directionsDisplay.setMap(this.map);
    directionsDisplay.setPanel(this.directionsPanel.nativeElement);

    directionsService.route({
      origin: '34.1284, 74.8365',
      // destination: '34.1535, 74.8023',
      waypoints: [{
        location: this.assignedstop.lat, this.assignedstop.lng,
        stopover: true
      },{
        location:'34.1009, 74.8092',
        stopover: true
      }],
      destination: '34.2323, 74.4163',

      provideRouteAlternatives: true,
      //  optimizeWaypoints: true,


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

    if (this.hideMe === false) {
      this.app.showLoader('Loading Route...');
      this.hideMe = true;
      this.button = "Hide";
      setTimeout(() => {
        this.showmap();
        this.startNavigating();
      }, 300);

    } else {

      this.hideMe = false;
      this.button = "Show Route Plan";

    }

  }

  gotomybus(): any {
    this.storage.get('bus_no').then((bus_no) => {
      bus_no = this.app.getToken(bus_no);
      this.app.showLoader("Loading...");
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      this.http.get(this.app.getUrl() + '/buses/' + bus_no, options)
        .map(res => res.json())
        .subscribe(

          result => {
            this.bus = result.bus;
            this.places = this.bus.stops.names;
            console.log(this.places);
            this.points = this.bus.stops.latLngs;
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
  getAssignedStop() {
    this.storage.get('user').then((user) => {
      this.locationService.getProfile(user)
        .subscribe(
          res => {
            //console.log(result);
            this.assignedstop = res.data.stop;
            console.log(this.assignedstop);
          },
          err => {

          },
          () => {

          }
        )
    })
  }

}
