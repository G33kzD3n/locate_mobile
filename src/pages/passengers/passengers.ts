import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';

@IonicPage()
@Component({
  selector: 'page-passengers',
  templateUrl: 'passengers.html',
})
export class PassengersPage {

  users:any[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public http: Http) {
    this.getdata()
  }

  getdata(){
    this.http.get("http://192.168.43.58:9000/api/1.0")
    .subscribe((data)=>{
      console.log(data.json());
      this.users = data.json();

    },(error)=>{
      console.log(error);

    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengersPage');
  }

}
