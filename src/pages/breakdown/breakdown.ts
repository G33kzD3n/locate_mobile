import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequestOptions, Headers, Http } from '@angular/http';
import { AppServiceProvider } from '../../providers/app-service/app-service';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-breakdown',
  templateUrl: 'breakdown.html',
})
export class BreakdownPage {

  constructor(public storage: Storage, private app: AppServiceProvider, public http: Http, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BreakdownPage');
  }


  message: string;
  sendBreakdown(data: { name: string }) {
    this.message = data.name;

    this.storage.get('bus_no').then((bus_no) => {

      let payload = {
        type: this.message,
        time: this.app.calDate()
      };
      console.log(payload);
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });

      //this.http.get("http://localhost:8000/api/user")

      this.http.post(this.app.getUrl() + '/buses/' + bus_no + '/breakdown', payload, options)
        .map(res => res.json())
        .subscribe(

          result => {

          },
          error => {
            this.app.showToast("Breakdown Message wasnt sent", 'top', 'error');
          },
          () => {
            this.app.showToast("Breakdown Message sent", 'top', 'success');
          });
    });
  }
}
