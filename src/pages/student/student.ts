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
    const location = new google.maps.LatLng(34.100, 74.800);
    let i,j;
    const options = {
      center: location,
      zoom: 15,
      disableDefaultUI: true
    }

    this.map = new google.maps.Map(this.mapRef.nativeElement, options);
  }
  addMarker(position, map) {
    return new google.maps.Marker({
      position,
      map
    })

  }


}
