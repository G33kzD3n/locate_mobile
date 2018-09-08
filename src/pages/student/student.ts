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
  constructor(public navCtrl: NavController, public menu: MenuController, public navParams: NavParams, public app: AppServiceProvider) {

  }

ionViewDidLoad(){
  //console.log(this.mapRef);
  this.showmap();
}
  showmap() {
    const location = new google.maps.LatLng(34.100, 74.800);

    const options = {
      center: location,
      zoom: 15,
          }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options
    );

    this.addMarker(location, this.map);
  }

  addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map
    })

  }


}
