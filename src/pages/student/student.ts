import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, PopoverController } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { MenuController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http } from '@angular/http';
import { DatePipe } from '@angular/common'
import { Geolocation } from "@ionic-native/geolocation";
import { PusherServiceProvider } from '../../providers/pusher-service/pusher-service';
import { LocationServiceProvider } from '../../providers/location-service/location-service';
import { ModalPage } from '../modal/modal';

import { DrawerPage } from '../drawer/drawer';


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
  livelocation: any;
  image = "assets/imgs/bus2.png";
  markers = [];

  buslocation: any;

  channel: any;
  public mylat: any;
  public mylon: any;
  public distance: any;
  public duration: any;
  

  constructor(public modal: ModalController, public pusher: PusherServiceProvider,
    public locationService: LocationServiceProvider,
    public storage: Storage, public http: Http, public datepipe: DatePipe,
    public navCtrl: NavController, public menu: MenuController,
    public navParams: NavParams, public app: AppServiceProvider, public geolocation: Geolocation,
    public popoverCtrl: PopoverController) {
      
  }

  ngOnInit() {

    this.getAssignedStop();
    this.showmap();
    
  }

  ionViewDidLoad() {}

  addMarker(position, map) {
    var marker = new google.maps.Marker({
      position: position,
      map: map
    });
    this.markers.push(marker);
    //return new google.maps.Marker({ position, map })
  }
  setMapOnAll(map) {
    for (var i = 0; i < this.markers.length; i++) {
      this.markers[i].setMap(map);
    }
  }
  clearMarkers() {
    this.setMapOnAll(null);
    this.markers = [];
  }
  showmap() {

    this.geolocation.getCurrentPosition({ enableHighAccuracy: true, timeout: 2000, maximumAge: 0 }).then((resp) => {
      this.mylat = resp.coords.latitude;
      this.mylon = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });
    const mymark = new google.maps.LatLng(this.mylat, this.mylon);
    this.showMarkers();
    this.addMarker(mymark, this.map);
    ///////////////Function Shows Markers////////////
    


    var location = new google.maps.LatLng(34.083656, 74.797371);

    let options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true,
      scaleControl: true,
      gestureHandling: 'cooperative',
      rotateControl: true,
      zoomControl: true,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
    };

    //create map
    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
    this.app.removeLoader();
    // this.locationService.id = setInterval(() => {
    this.getlocation();
    
    // }, 7000);
  }
  showMarkers() {
    this.setMapOnAll(this.map);
  }



  getlocation() {
    this.storage.get('bus_no').then((bus_no) => {
      bus_no = this.app.getToken(bus_no);
      this.channel = this.pusher.init(bus_no + '-channel');
      this.channel.bind('location-update', (data) => {
        this.bus = data;
        this.livelocation = data;
//////////////ETA Function CAll/////////////////////////
        this.eta();
        this.clearMarkers();

        const loc = new google.maps.LatLng(data.lat, data.lng);
        this.addMarker(loc, this.map);
        this.showMarkers();
        this.app.showToast(JSON.stringify(data), 'top', 'success');
        console.log(this.app.message);
        this.app.message.push(data.lat, data.lng);
        this.app.ncounter++;
        console.log(this.app.message);
      });
    });
  }

  ionViewDidLeave() {
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
////////////////ETA//////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
  eta() {
  
   var origin1 = new google.maps.LatLng(this.livelocation.lat, this.livelocation.lng);
   var destinationA = new google.maps.LatLng(this.assignedstop.lat, this.assignedstop.lng);
      
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: [destinationA],
        travelMode: 'DRIVING',
        unitSystem: google.maps.UnitSystem.METRIC,
        avoidHighways: false,
        avoidTolls: false
      }, ( response,status)=>{
        if (status == 'OK') {
         
  
         this.distance = response.rows[0].elements[0].distance.text;
         this.duration = response.rows[0].elements[0].duration.text;
         //let eta = this.duration + 
         console.log(this.distance);
         console.log(this.duration);
        }
      });  
  }
//////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////
  focus(xyz) {
    if (xyz == 1) {
      try {
        this.map.setCenter({
          lat: this.livelocation.lat,
          lng: this.livelocation.lng
        });
        this.app.showToast('Bus Located' ,'top', '');
      } catch (error) {

        this.app.showToast('No Live Bus Not Found', 'top', '');
      }


    } else if (xyz == 2) {
      try {
        this.map.setCenter({
          lat: this.mylat,
          lng: this.mylon
        });
        this.app.showToast('Current Location' ,'top', '');
      } catch (error) {
        this.app.showToast('Unable To Find Your Location. Enable GPS', 'top', '');
      }



    } else {

      this.map.setCenter({
        lat: this.assignedstop.lat,
        lng: this.assignedstop.lng
      });
      this.app.showToast('Your Registered Stop' ,'top', '');
    }
  }

  presentPopover(ev){
    let popover = this.popoverCtrl.create(ModalPage);
    popover.present({
      ev: ev
    });
 
   }
   presentDrawer(ev){
     let popover = this.popoverCtrl.create(DrawerPage, {}, {cssClass:'pageDrawer'});
     popover.present({
       ev:ev
     });
   }

 
}