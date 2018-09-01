import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the DriverhomepagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-driverhomepage',
  templateUrl: 'driverhomepage.html',
})
export class DriverhomepagePage {

  isOn: boolean = false;
  buttonColor: string;
  text: string = "Start Engine";

  onClickIgnition() {
    if (this.isOn == false) {
      console.log("Engine started");
      this.buttonColor = "#008000";
      this.isOn = true;
      this.text = "Turn Off Engine"
    } else {

      console.log("Engine Turned Off");
      this.buttonColor = "#0000cd";
      this.isOn = false;
      this.text = "Start Engine"
    }
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DriverhomepagePage');
  }

}
