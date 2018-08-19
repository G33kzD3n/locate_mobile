import { Component,} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import 'rxjs/add/operator/map';
import {Http} from "@angular/http";

/**
 * Generated class for the RoutePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-route',
  templateUrl: 'route.html',
  //template: `<page-login></page-login>`,
  
})
export class RoutePage {
  title = 'Route';

  firstRoute = {
    id: 1,
    driverName: "bilal",
    driverRoute: "Universitry-lalbazaar-alamgaribazar-Hawal-Gojwara-Qamarwari"
    
  }

  constructor( public http :Http,
    public navCtrl: NavController, public navParams: NavParams, public app : AppServiceProvider) {
  
  }

/* ionViewDidLoad()
  {
    this.app.getRemoteData().subscribe(data => {
    let jobs = [];

    for(var i=0; i< data.length; i++); {
		jobs.push(
    {
  	//job_id: data[i].id, 
	//  job_name: data[i].name,
	  //job_desc: data[i].desc
    });      
                                      }
                                                })
  }*/
  ionViewDidLoad(){
    console.log("hello");
    this.http.get("https://jsonplaceholder.typicode.com/us")
      .map(result=>result.json())
      .subscribe(result =>{
        console.log(result[0].name);
      },
      error =>{
        console.log(error);
      }
    );
    
  }
}