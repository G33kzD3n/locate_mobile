import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { MenuController } from 'ionic-angular';


declare var google: any;

@IonicPage()
@Component({

  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {
  @ViewChild('map') mapRef: ElementRef;
  map: any;
  loc: any;
  public stops: any = [
    [34.127998, 74.83688],
    [34.095828, 74.79851],
    [34.091799, 74.776903],
    [34.112223, 74.5630],
    [34.232416, 74.415789]
  ];

  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public app: AppServiceProvider) {
  }


  ionViewDidLoad() {
    //console.log(this.mapRef);
    this.showmap();
  }
  showmap() {
    let infoWindow: any;
    const location = new google.maps.LatLng(34.100, 74.800);
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true,
      zoomControl: true,
      scaleControl: true,
      rotateControl: false,
      fullscreenControl: false
    }
    this.map = new google.maps.Map(document.getElementById('map'), {
      center: { lat: 34.100, lng: 74.800 },
      zoom: 10
    });
    infoWindow = new google.maps.InfoWindow;

    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        infoWindow.setPosition(pos);
        infoWindow.setContent('Location found.');
        // var mark = new google.maps.Marker({ pos, map:'map' });
        // mark.setPosition({lat: pos.lat, lng: pos.lng});
        infoWindow.open(this.map);
        this.map.setCenter(pos);
      }, () => {
        this.handleLocationError(true, infoWindow, this.map.getCenter());
      });
    } else {
      // Browser doesn't support Geolocation
      this.handleLocationError(false, infoWindow, this.map.getCenter());
    }
  }

  handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
      'Error: The Geolocation service failed.' :
      'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(this.map);
  }

  // this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  //this.loc = new LatLng(location.getLatitude(), location.getLongitude());
  //this.addMarker(location,this.map); 

  addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map
    })
  }
  }


// }