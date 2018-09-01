import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BreakdownPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-breakdown',
  templateUrl: 'breakdown.html',
})
export class BreakdownPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BreakdownPage');
  }

    
  message:string;
  sendBreakdown(data:{name:string}){
    console.log(data);
    this.message = "Message sent " + data.name;
  }
}
