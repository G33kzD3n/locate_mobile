import { Component,} from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AppServiceProvider } from '../../providers/app-service/app-service';

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
})
export class RoutePage {
 

  firstRoute = {
    id: 1,
    driverName: "bilal",
    driverRoute: "Universitry-lalbazaar-alamgaribazar-Hawal-Gojwara-Qamarwari"
    
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public app : AppServiceProvider) {
  
  }

  ionViewDidLoad()
  {
    this.app.getRemoteData().subscribe(data => {
    let jobs = [];

    for(var i=0; i<data.length; i++); {
		jobs.push(
    {
  	//job_id: data[i].id, 
	  job_name: data[i].name,
	  job_desc: data[i].desc
    });      
                                      }
                                                })
  }
}