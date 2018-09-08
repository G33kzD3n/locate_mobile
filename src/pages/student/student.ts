import { Component, ViewChild, ElementRef} from '@angular/core';
import { IonicPage, NavController, NavParams} from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import leaflet, { Draggable } from 'leaflet';
import 'leaflet-routing-machine';
import { MenuController } from 'ionic-angular';
import { Title, disableDebugTools } from '@angular/platform-browser';
import { updateDate } from 'ionic-angular/umd/util/datetime-util';

@IonicPage()
@Component({
  
  selector: 'page-student',
  templateUrl: 'student.html',
})
export class StudentPage {
  @ViewChild('map') mapContainer:ElementRef;
  myMap :any;
  mapOptions = {
    center ://[
              [34.0836708, 74.7972825],
            // [34.095828,74.79851],
            // [34.091799,74.776903],
            // [34.112223,74.5630],
            // [34.232416,74.415789]],
    zoom :   11
  };
//   public stops:any = [
//    ["Kashmir University" ,34.127998,74.83688],
//     ["kkllgg" ,34.095828,74.79851],
//     ["dcsdcccc", 34.091799,74.776903],
//     ["dscwwefwef",34.112223,74.5630],
//     ["wefwfwfwg", 34.232416,74.415789]
    
// ];
public stops:any = [
   [34.127998,74.83688],
   [34.095828,74.79851],
   [34.091799,74.776903],
  [34.112223,74.5630],
  [34.232416,74.415789]
   
   
];
public stops1:any =[
  [1,2],
  [3,4],
  [5,6]
  
]

markerOptions:any = {
  title: "MyLocation",
  clickable: true,
  draggable: true,
}

  constructor(public navCtrl: NavController,public menu: MenuController, public navParams: NavParams,public app: AppServiceProvider) {
    setInterval(() =>{
      this.showMap();}, 5000);
   }

  ionViewDidLoad() {
    // this.app.showLoader('Wait logging in..');
    // setTimeout(()=>{
      // this.app.removeLoader();
     this.createmap();
    //   console.log("hello");
    // },1500);
     
  }
createmap()
{
  this.myMap = leaflet.map('map').setView([this.mapOptions.center[0],this.mapOptions.center[1]],this.mapOptions.zoom);
    leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.myMap);
}
  

  showMap()
  { 
    let i,polyline;
    //this.createmap();

    //creating markers:
    
    for (i = 0; i < this.stops.length; i ++){
      // console.log(this.stops1[i][0]);
      // console.log(this.stops1[i][1]);
      let marker = new leaflet.Marker([this.stops[i][0],this.stops[i][1]])
      .bindPopup(this.stops[i][0]).openPopup()
      .addTo(this.myMap)
     console.log("in showmap");
      console.log(this.stops[i][0]);
      console.log(this.stops[i][1]);
      let polyline = leaflet.polyline([this.stops], {color:'red'})
      .addTo(this.myMap);
    }
    // this.myMap.remove();
    this.update();
    
}

  update()
  { let i;
    

    for(i=0; i<this.stops.length; i++){
      // console.log(this.stops[i][0]);
      // console.log(this.stops[i][1]);
    this.stops[i][0] += .20000;
    this.stops[i][1] += .10000;
    console.log(this.stops[i][0]);
      console.log(this.stops[i][1]);
    }
  }
    // let polyline = leaflet.polyline(this.stops, {color:'red'})
    //   .addTo(this.myMap);
    //   let polyline1 = leaflet.polyline(this.stops1, {color:'red'})
    //   .addTo(this.myMap);
      
      //leaflet.polyline([this.stops],{color:'red'})
      //.addTo(this.myMap)
    //   console.log(leaflet.Routing);
    // // leaflet.Routing.control({
    //   waypoints:[
    //         leaflet.latLng(34.127998,74.83688),
    //         leaflet.latLng(34.095828,74.79851)
    //       ],
    //     // geocoder: L.Control.Geocoder.nominatim()
    //   })
    //   .on('routesfound', function(e) {
    //     var routes = e.routes;
    //     console.log('Found ' + routes.distance + ' route(s).');
    //   })
    //   .on('message',function(e){
    //     console.log('error');
    //   })
    //   .addTo(this.myMap);
    
    // var polygon = L.polygon(latlngs, {color: 'red'});
// for(let i=0; i<this.stops.length;i++){
//     leaflet.polygon([this.stops[i][1],this.stops[i][2]],{color:'red'})
//     // .bindPopup(this.stops[i][0])
//     // .openPopup(this.stops[i][0])
//     .addTo(this.myMap);
// }  



}
